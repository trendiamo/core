require "active_support/all"
require "dotenv/load"
require "slack-ruby-bot"

MAX_CHARS_PER_BLOCK = 3000 # https://api.slack.com/reference/messaging/blocks#section

ActiveSupport::Dependencies.autoload_paths = ["lib/"]

PROJECTS_HASH = {
  "api": :backend,
  "backend": :backend,
  "slack-bot": :slack_bot,
  "slack bot": :slack_bot,
  "frekky": :slack_bot,
  "yourself": :slack_bot,
  "console-frontend": :console_frontend,
  "console frontend": :console_frontend,
  "admin": :console_frontend,
  "landing-page": :landing_page,
  "landing page": :landing_page,
  "plugin": :plugin,
  "plugiamo": :plugin,
  "shopify-app": :shopify_app,
  "shopify app": :shopify_app,
  "shopify integration": :shopify_app,
  "shopify": :shopify_app,
}.freeze

PROJECTS_STR = PROJECTS_HASH.values.uniq.map(&:to_s).map(&:humanize).map(&:downcase)

def say_in_channel(text, client, data)
  client.say(text: text, channel: data.channel)
end

def say_in_thread(text, client, data)
  thread_ts = client.channels[data.channel] ? data.thread_ts || data.ts : nil
  client.say(text: text, channel: data.channel, thread_ts: thread_ts)
end

def adv_say_in_thread(text, client, data)
  thread_ts = client.channels[data.channel] ? data.thread_ts || data.ts : nil
  options = {
    text: text, channel: data.channel, thread_ts: thread_ts, username: "frekky",
    icon_url: "https://ca.slack-edge.com/T60EVHHM4-UHWVDTWK0-b90c1787e914-48",
  }
  response = client.web_client.chat_postMessage(options)
  response.ts
end

def update(text, output, client, data, msg_ts)
  markdown = "```#{output.chars.last(MAX_CHARS_PER_BLOCK - 6).join.strip}```"
  blocks = [
    { type: "section", text: { type: "plain_text", text: text } },
    { type: "section", text: { type: "mrkdwn", text: markdown } },
  ]
  client.web_client.chat_update(channel: data.channel, ts: msg_ts, blocks: blocks)
end

def say_in_context(text, client, data)
  client.say(text: text, channel: data.channel, thread_ts: data.thread_ts)
end

def project_label(project)
  project.to_s.humanize.downcase
end

def deploy_project_cmd(project, text, client, data, msg_ts)
  output = ""
  Services::Deploy.perform(project) do |_stdin, stdout_and_stderr, wait_thr|
    while line = stdout_and_stderr.gets # rubocop:disable Lint/AssignmentInCondition
      line = line.gsub(/.*\r/, "") # workaround messy git output
      output = "#{output}#{line}"
      update(text, output, client, data, msg_ts)
    end

    wait_thr.value
  end
end

def deploy_project(project, client, data)
  text = "Deploying #{project_label(project)}... :laughing:"
  msg_ts = adv_say_in_thread(text, client, data)
  status = deploy_project_cmd(project, text, client, data, msg_ts)
  if status.success?
    say_in_thread("Deployed #{project_label(project)} :+1:", client, data)
  else
    say_in_channel("Couldn't deploy #{project_label(project)} :confused:", client, data)
  end
end

class Frekky < SlackRubyBot::Bot
  help do
    title "Frekky"
    desc "I can deploy apps."

    command "deploy" do
      desc "I'll deploy an app for you."
      long_desc "command format: *deploy <app>* where <app> is one of: #{PROJECTS_STR}."
    end
  end

  command("deploy") do |client, data, match|
    channel = client.channels[data.channel]
    if !channel || channel.name != "tech"
      say_in_context("Ask me in #tech so all devs are aware.", client, data)
    else
      project = PROJECTS_HASH[(match[:expression] || "").downcase.gsub(/^the /, "").to_sym]
      if !project
        say_in_thread("Unrecognized project to deploy: `#{match[:expression]}` :face_with_rolling_eyes:", client, data)
      else
        deploy_project(project, client, data)
      end
    end
  end
end

SlackRubyBot.configure do |config|
  config.aliases = [":robot_face:"]
  config.logger = begin
    $stdout.sync = true
    logger = Logger.new($stdout)
    logger.level = Logger::INFO
    logger
  end
end

Frekky.run

require "dotenv/load"
require "active_support/all"
require "slack-ruby-bot"

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
  # "landing-page": :landing_page,
  # "landing page": :landing_page,
  "plugin": :plugin,
  "plugiamo": :plugin,
  "shopify-app": :shopify_app,
  "shopify app": :shopify_app,
  "shopify integration": :shopify_app,
  "shopify": :shopify_app,
}.freeze

PROJECTS_STR = PROJECTS_HASH.values.uniq.map(&:to_s).map(&:humanize).map(&:downcase)

def say_in_thread(text, client, data)
  client.say(text: text, channel: data.channel, thread_ts: data.thread_ts || data.ts)
end

def say_in_context(text, client, data)
  client.say(text: text, channel: data.channel, thread_ts: data.thread_ts)
end

def say_in_channel(text, client, data)
  client.say(text: text, channel: data.channel)
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
      say_in_context("Ask me in #tech so everyone's aware.", client, data)
    else
      project = PROJECTS_HASH[(match[:expression] || "").downcase.gsub(/^the /, "").to_sym]
      if !project
        say_in_thread("Unrecognized project to deploy: `#{match[:expression]}` :face_with_rolling_eyes:", client, data)
      else
        project_label = project.to_s.humanize.downcase
        say_in_thread("Deploying #{project_label}... :laughing:", client, data)
        stdout, stderr, status = Services::Deploy.perform(project)
        if status.success?
          say_in_thread("Deployed #{project_label} :+1:", client, data)
        else
          text = <<~PLAIN
            Couldn't deploy #{project_label} :confused:
            Here's the output:

            ```
            stdout:
            #{stdout.chars.last(240).join.strip}

            stderr:
            #{stderr.chars.last(240).join.strip}
            ```
          PLAIN
          say_in_channel(text, client, data)
        end
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

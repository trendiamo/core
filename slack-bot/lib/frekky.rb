require "dotenv/load"
require "active_support/all"
require "slack-ruby-bot"
require "fuzzy_match"

ActiveSupport::Dependencies.autoload_paths = ["lib/"]

PROJECTS_HASH = {
  "api": :backend,
  "backend": :backend,
  # "slack-bot": :slack_bot,
  # "slack bot": :slack_bot,
  # "frekky": :slack_bot,
  # "yourself": :slack_bot,
  "console-frontend": :console_frontend,
  "console frontend": :console_frontend,
  "admin": :console_frontend,
  "landing-page": :landing_page,
  "landing page": :landing_page,
  # "plugin": :plugiamo,
  # "plugiamo": :plugiamo,
}.freeze

PROJECTS_STR = PROJECTS_HASH.values.map(&:to_s).map(&:humanize).map(&:downcase)

def say_in_thread(text, client, data)
  client.say(text: text, channel: data.channel, thread_ts: data.thread_ts || data.ts)
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

  command("ping") do |client, data, _match|
    client.say(text: "pong", channel: data.channel)
  end

  command("deploy") do |client, data, match|
    project_key = FuzzyMatch.new(PROJECTS_HASH.keys).find(match[:expression].gsub(/^the /i, ""))
    if !project_key
      say_in_thread("Unrecognized project to deploy: `#{match[:expression]}` 🙄", client, data)
    else
      project = PROJECTS_HASH[project_key]
      project_label = project.to_s.humanize.downcase
      say_in_thread("Deploying #{project_label}... 😆", client, data)
      stdout, stderr, status = Services::Deploy.perform(PROJECTS_HASH[project_key])
      if status.success?
        say_in_thread("Deployed #{project_label} 👍", client, data)
      else
        text = <<~PLAIN
          Couldn't deploy #{project_label} 😕
          Here's the output:

          ```
          stdout:
          #{stdout.chars.last(240).join.strip}

          stderr:
          #{stderr.chars.last(240).join.strip}
          ```
        PLAIN
        say_in_thread(text, client, data)
      end
    end
  end
end

SlackRubyBot.configure do |config|
  config.aliases = [":robot_face:"]
end

Frekky.run

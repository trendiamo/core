require "dotenv/load"
require "active_support"
require "slack-ruby-bot"
require "fuzzy_match"

ActiveSupport::Dependencies.autoload_paths = ["lib/"]

PROJECTS = [
  "backend",
  "console frontend",
  "landing page",
  "plugin",
].freeze

def say_in_thread(text, client, data)
  client.say(text: text, channel: data.channel, thread_ts: data.thread_ts || data.ts)
end

class Frekky < SlackRubyBot::Bot
  help do
    title "Frekky"
    desc "I can deploy apps."

    command "deploy" do
      desc "I'll deploy an app for you."
      long_desc "command format: *deploy <app>* where <app> is one of: #{PROJECTS.join(', ')}."
    end
  end

  command("ping") do |client, data, _match|
    client.say(text: "pong", channel: data.channel)
  end

  command("deploy") do |client, data, match|
    project = FuzzyMatch.new(PROJECTS).find(match[:expression])
    if !project
      say_in_thread("Unrecognized project to deploy", client, data)
    elsif project != "landing page"
      say_in_thread("Sorry, I'm not programmed to deploy #{project} yet", client, data)
    else
      say_in_thread("Deploying #{project}... 🤔", client, data)
      success, output = Services::Deploy::LandingPageFrekkls.perform
      if success
        say_in_thread("Deployed #{project} 👍", client, data)
      else
        say_in_thread("Couldn't deploy #{project} 😕\nHere's the output:\n```#{output}```", client, data)
      end
    end
  end
end

SlackRubyBot.configure do |config|
  config.aliases = [":robot_face:"]
end

Frekky.run

require "active_support/all"
require "dotenv/load"
require "slack-ruby-bot"

ActiveSupport::Dependencies.autoload_paths = ["lib/"]

class Frekky < SlackRubyBot::Bot
  help do
    title "Frekky"
    desc "I can deploy apps."

    command "deploy" do
      desc "Deploys an app"
      long_desc "command format: *deploy <app> to <env>* where <app> is one of: "\
                "#{Commands::Deploy.all_project_names}, and <env> is one of: [\"production\", \"staging\"]."
    end

    command "version" do
      desc "Shows the current version"
    end
  end

  command("deploy") do |client, data, match|
    Commands::Deploy.new(client, data, match).perform
  end

  command("version") do |client, data, match|
    Commands::Version.new(client, data, match).perform
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

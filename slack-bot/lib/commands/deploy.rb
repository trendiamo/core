PROJECTS_HASH = {
  "api": :api,
  "backend": :api,
  "slack-bot": :slack_bot,
  "slack bot": :slack_bot,
  "frekky": :slack_bot,
  "yourself": :slack_bot,
  "admin": :admin,
  "console-frontend": :admin,
  "console frontend": :admin,
  "landing-page": :landing_page,
  "landing page": :landing_page,
  "plugin": :plugin,
  "plugiamo": :plugin,
  "shopify-app": :shopify_app,
  "shopify app": :shopify_app,
  "shopify integration": :shopify_app,
  "shopify": :shopify_app,
}.freeze

module Commands
  class Deploy < Commands::Base
    def self.all_project_names
      PROJECTS_HASH.values.uniq.map(&:to_s).map(&:humanize).map(&:downcase)
    end

    def perform # rubocop:disable Metrics/MethodLength
      project_str, environment_str = match_strings
      @project = match_project(project_str)
      @environment = match_environment(environment_str)
      if !in_channel?("tech")
        say_in_context("Ask me in #tech so all devs are aware.")
      elsif !@project
        say_in_thread("Unrecognized project: `#{project_str}` :face_with_rolling_eyes:")
      elsif !@environment
        say_in_thread("Unrecognized environment: `#{environment_str}` :face_with_rolling_eyes:")
      else
        deploy_project
      end
    end

    private

    def match_strings
      (@match[:expression] || "").split(" to ")
    end

    def match_project(project_str)
      PROJECTS_HASH[(project_str || "").downcase.gsub(/^the /, "").to_sym]
    end

    def match_environment(environment_str)
      if %w[prod production frekkls].include?(environment_str)
        :production
      elsif %w[staging pimppls].include?(environment_str)
        :staging
      end
    end

    def deploy_project
      text = "Deploying #{project_label} to #{@environment}... :laughing:"
      msg_ts = adv_say_in_thread(text)
      status = deploy_project_cmd(text, msg_ts)
      if status.success?
        say_in_thread("Deployed #{project_label} to #{@environment} :+1:")
      else
        say_in_channel("Couldn't deploy #{project_label} :confused:")
      end
    end

    def project_label
      @project.to_s.humanize.downcase
    end

    def deploy_project_cmd(text, msg_ts)
      output = ""
      Services::Deploy.perform(@project, @environment) do |_stdin, stdout_and_stderr, wait_thr|
        while line = stdout_and_stderr.gets # rubocop:disable Lint/AssignmentInCondition
          line = line.gsub(/.*\r/, "") # workaround messy git output
          output = "#{output}#{line}"
          update(text, output, msg_ts)
        end

        wait_thr.value
      end
    end
  end
end

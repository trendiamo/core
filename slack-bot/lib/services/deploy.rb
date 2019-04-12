require "open3"

CLONE_CORE_CMD = <<~SH.freeze
  GIT_SSH_COMMAND='ssh -o "StrictHostKeyChecking=no" -i #{ENV['GITHUB_KEY_FILE']}' \
  git clone -q git@github.com:trendiamo/core.git #{ENV['BUILD_FOLDER']}/core && \
  cd #{ENV['BUILD_FOLDER']}/core && \
  git remote add dokku-backend dokku@46.101.129.17:console-backend && \
  git remote add dokku-shopify dokku@46.101.129.17:shopify-app && \
  git remote add dokku-slack-bot dokku@46.101.129.17:slack-bot
SH

FETCH_CORE_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core && \
  GIT_SSH_COMMAND='ssh -o "StrictHostKeyChecking=no" -i #{ENV['GITHUB_KEY_FILE']}' \
  git pull
SH

BACKEND_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core && \
  GIT_SSH_COMMAND='ssh -o "StrictHostKeyChecking=no" -i #{ENV['DOKKU_KEY_FILE']}' \
  git subtree push -q --prefix backend dokku-backend master
SH

SLACK_BOT_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core && \
  GIT_SSH_COMMAND='ssh -o "StrictHostKeyChecking=no" -i #{ENV['DOKKU_KEY_FILE']}' \
  git subtree push -q --prefix slack-bot dokku-slack-bot master
SH

SHOPIFY_APP_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core && \
  GIT_SSH_COMMAND='ssh -o "StrictHostKeyChecking=no" -i #{ENV['DOKKU_KEY_FILE']}' \
  git subtree push -q --prefix integrations/shopify dokku-shopify master
SH

CONSOLE_FRONTEND_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core/console-frontend && \
  yarn install --silent --no-progress && \
  bin/deploy
SH

LANDING_PAGE_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core/landing-pages/frekkls && \
  cp #{ENV['LANDING_PAGE_ENV_FILE']} . && \
  yarn install --silent --no-progress && \
  gatsby build --no-color && \
  rsync -azq -e ssh --delete-after --ignore-errors public/ root@139.59.128.112:/var/www/frekkls.com/html
SH

module Services
  class Deploy
    def self.perform(project)
      new(project).send(:perform)
    end

    private

    def initialize(project)
      @project = project
    end

    def perform
      clone_core unless core_exists?
      fetch_core
      puts deploy_cmd
      Open3.capture3(deploy_cmd)
    end

    def clone_core
      `#{CLONE_CORE_CMD}`
    end

    def core_exists?
      File.directory?("#{ENV['BUILD_FOLDER']}/core")
    end

    def fetch_core
      `#{FETCH_CORE_CMD}`
    end

    def deploy_cmd
      "#{@project.to_s.upcase}_CMD".constantize
    end
  end
end

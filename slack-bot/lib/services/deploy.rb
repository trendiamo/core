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
  git fetch && \
  git reset --hard origin/master
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

PLUGIN_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core/plugiamo && \
  yarn install --silent --no-progress && \
  cd ../plugin-base && yarn install-p && yarn build && cd ../plugiamo && \
  cp #{ENV['PLUGIN_ENV_FILE']} . && \
  mkdir -p ~/.aws && \
  ([ -f ~/.aws/credentials ] || cp #{ENV['AWS_CREDENTIALS_FILE']} ~/.aws/credentials) && \
  yarn build && \
  gzip -9 -c build/plugin.js | aws s3 --region eu-central-1 cp - s3://plugiamo/plugin.js --content-type text/javascript --content-encoding gzip --acl public-read --cache-control 'public,max-age=600' && \
  gzip -9 -c build/vendors~emoji.js | aws s3 cp - s3://plugiamo/vendors~emoji.js --quiet --content-type text/javascript --content-encoding gzip --acl public-read --cache-control 'public,max-age=600' && \
  aws --profile do --endpoint=https://ams3.digitaloceanspaces.com s3 cp build/plugin.js s3://javascript/plugin.js --content-type text/javascript --acl public-read --cache-control 'public,max-age=600' && \
  aws --profile do --endpoint=https://ams3.digitaloceanspaces.com s3 cp build/vendors~emoji.js s3://javascript/vendors~emoji.js --quiet --content-type text/javascript --acl public-read --cache-control 'public,max-age=600' && \
  rm build/*.js
SH

CONSOLE_FRONTEND_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core/console-frontend && \
  yarn install --silent --no-progress && \
  deploy/deploy 'ssh -o "StrictHostKeyChecking=no" -i #{ENV['STATIC_KEY_FILE']}'
SH

LANDING_PAGE_CMD = <<~SH.freeze
  cd #{ENV['BUILD_FOLDER']}/core/landing-pages/frekkls && \
  yarn install --silent --no-progress && \
  cp #{ENV['LANDING_PAGE_ENV_FILE']} . && \
  node_modules/.bin/gatsby build --no-color && \
  rsync -azq -e 'ssh -o "StrictHostKeyChecking=no" -i #{ENV['STATIC_KEY_FILE']}' --delete-after --ignore-errors public/ root@139.59.128.112:/var/www/frekkls.com/html
SH

module Services
  class Deploy
    def self.perform(project, &block)
      new(project).send(:perform, &block)
    end

    private

    def initialize(project)
      @project = project
    end

    def perform(&block)
      clone_core(&block) unless core_exists?
      fetch_core(&block)
      deploy(&block)
    end

    def core_exists?
      File.directory?("#{ENV['BUILD_FOLDER']}/core")
    end

    def clone_core(&block)
      Open3.popen2e(CLONE_CORE_CMD, &block)
    end

    def fetch_core(&block)
      Open3.popen2e(FETCH_CORE_CMD, &block)
    end

    def deploy(&block)
      Open3.popen2e("#{@project.to_s.upcase}_CMD".constantize, &block)
    end
  end
end

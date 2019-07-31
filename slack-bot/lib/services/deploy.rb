require "open3"

class MockIO
  def initialize(string)
    @string = string
    @called = false
  end

  def gets
    return nil if @called

    @called = true
    @string
  end
end

class MockWaitThr
  def value
    true
  end
end

module Services
  CLONE_CORE_CMD = <<~SH.freeze
    GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no -i #{ENV['GITHUB_KEY_FILE']}' \
    git clone -q git@github.com:trendiamo/core.git #{ENV['BUILD_FOLDER']}/core && \
    cd #{ENV['BUILD_FOLDER']}/core && \
    git remote add dokku-backend dokku@46.101.129.17:console-backend && \
    git remote add dokku-shopify dokku@46.101.129.17:shopify-app && \
    git remote add dokku-slack-bot dokku@46.101.129.17:slack-bot && \
    git remote add dokku-staging-backend dokku@167.71.50.172:console-backend
  SH

  FETCH_CORE_CMD = <<~SH.freeze
    cd #{ENV['BUILD_FOLDER']}/core && \
    GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no -i #{ENV['GITHUB_KEY_FILE']}' \
    git fetch && \
    git reset --hard origin/master
  SH

  class Deploy
    def self.perform(project, environment, &block)
      new(project, environment).send(:perform, &block)
    end

    private

    def initialize(project, environment)
      @project = project
      @environment = environment
    end

    def perform(&block)
      yield(nil, MockIO.new("Cloning...\n"), MockWaitThr.new)
      clone_core(&block) unless core_exists?
      yield(nil, MockIO.new("Fetching...\n"), MockWaitThr.new)
      fetch_core(&block)
      yield(nil, MockIO.new("Deploying...\n"), MockWaitThr.new)
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
      Open3.popen2e(send("deploy_#{@project}"), &block)
    end

    def deploy_api
      branch = @environment == "production" ? "dokku-backend" : "dokku-staging-backend"
      <<~SH
        cd #{ENV['BUILD_FOLDER']}/core && \
        GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no -i #{ENV['DOKKU_KEY_FILE']}' \
        git subtree push -q --prefix backend #{branch} master
      SH
    end

    def deploy_slack_bot
      branch = @environment == "production" ? "dokku-slack-bot" : "dokku-staging-slack-bot"
      <<~SH
        cd #{ENV['BUILD_FOLDER']}/core && \
        GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no -i #{ENV['DOKKU_KEY_FILE']}' \
        git subtree push -q --prefix slack-bot #{branch} master
      SH
    end

    def deploy_shopify_app
      branch = @environment == "production" ? "dokku-shopify" : "dokku-staging-shopify"
      <<~SH
        cd #{ENV['BUILD_FOLDER']}/core && \
        GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no -i #{ENV['DOKKU_KEY_FILE']}' \
        git subtree push -q --prefix integrations/shopify #{branch} master
      SH
    end

    def deploy_admin
      <<~SH
        cd #{ENV['BUILD_FOLDER']}/core/console-frontend && \
        yarn install --silent --no-progress && \
        deploy/deploy #{@environment} '-o StrictHostKeyChecking=no -i #{ENV['STATIC_KEY_FILE']}'
      SH
    end

    def deploy_plugin
      <<~SH
        cd #{ENV['BUILD_FOLDER']}/core/plugiamo && \
        yarn install --silent --no-progress && \
        mkdir -p ~/.aws && \
        ([ -f ~/.aws/credentials ] || cp #{ENV['AWS_CREDENTIALS_FILE']} ~/.aws/credentials) && \
        cp #{ENV['PLUGIN_ENV_FILE']} . && \
        cp #{ENV['PLUGIN_BASE_ENV_FILE']} ../plugin-base/ && \
        cd ../plugin-base && yarn install-p && yarn build && cd ../plugiamo && \
        yarn build && \
        gzip -9 -c build/plugin.js | aws s3 --region eu-central-1 cp - s3://plugiamo/plugin.js --content-type text/javascript --content-encoding gzip --acl public-read --cache-control 'public,max-age=600' && \
        gzip -9 -c build/vendors~emoji.js | aws s3 cp - s3://plugiamo/vendors~emoji.js --quiet --content-type text/javascript --content-encoding gzip --acl public-read --cache-control 'public,max-age=600' && \
        aws --profile do --endpoint=https://ams3.digitaloceanspaces.com s3 cp build/plugin.js s3://javascript/plugin.js --content-type text/javascript --acl public-read --cache-control 'public,max-age=600' && \
        aws --profile do --endpoint=https://ams3.digitaloceanspaces.com s3 cp build/vendors~emoji.js s3://javascript/vendors~emoji.js --quiet --content-type text/javascript --acl public-read --cache-control 'public,max-age=600' && \
        deploy/notify-rollbar && \
        rm build/*.js
      SH
    end

    def deploy_landing_page
      destination = begin
        if @environment == "production"
          "root@139.59.128.112:/var/www/frekkls.com/html"
        else
          "root@167.71.50.172:/var/www/@/html"
        end
      end
      # We should remove the `rm -rf .cache` line when this is fixed: https://github.com/gatsbyjs/gatsby/pull/16220
      <<~SH
        cd #{ENV['BUILD_FOLDER']}/core/landing-pages/frekkls && \
        yarn install --silent --no-progress && \
        cp #{ENV['LANDING_PAGE_ENV_FILE']} . && \
        rm -rf .cache && \
        node_modules/.bin/gatsby build --no-color && \
        rsync -azq -e 'ssh -o StrictHostKeyChecking=no -i #{ENV['STATIC_KEY_FILE']}' --delete-after --ignore-errors public/ #{destination}
      SH
    end
  end
end

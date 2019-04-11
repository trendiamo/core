CMD = <<-SH.freeze
  rm -rf #{ENV['BUILD_FOLDER']}/core && \
  GIT_SSH_COMMAND='ssh -i #{ENV['GIT_DEPLOY_KEY_FILE']}' \
  git clone -q --depth 1 git@github.com:trendiamo/core.git #{ENV['BUILD_FOLDER']}/core && \
  cd #{ENV['BUILD_FOLDER']}/core/landing-pages/frekkls && \
  cp #{ENV['LANDING_PAGE_ENV_FILE']} . && \
  yarn install --silent --no-progress && \
  gatsby build --no-color && \
  rsync -azq -e ssh --delete-after --ignore-errors public/ root@139.59.128.112:/var/www/frekkls.com/html
SH

module Services
  module Deploy
    class LandingPageFrekkls
      def self.perform
        output = `#{CMD}`
        [$?.success?, output]
      end
    end
  end
end

# Digital Ocean: console droplet

## Description

This droplet has apps managed by dokku. The apps are: `console-backend`, `shopify-app`, `slack-bot`.

## Commands to setup

```sh
# When creating the droplet, choose one-click installs: Dokku

# Do not finish the online Dokku setup before deploying apps, and do not add keys in the online setup

# TODO: setup a sudo-enabled user called deploy, do the rest with this user.

# TODO: firewall

# To add users to be able to deploy, run in your local machine (make sure to replace vars below):
cat <pub-key-file> | ssh root@46.101.129.17 "sudo sshcommand acl-add dokku <key-id>"

# Add required plugins

dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku plugin:install https://github.com/dokku/dokku-redis.git redis

# Install certbot:

add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install certbot

# To setup the console-backend app:

dokku apps:create console-backend
dokku postgres:create console-backend-pg
dokku postgres:link console-backend-pg console-backend
dokku redis:create console-backend-redis
dokku redis:link console-backend-redis console-backend
# CORS_ORIGIN allows multiple values (comma-separated), so it cannot be used for the same purpose as FRONTEND_BASE_URL
dokku config:set console-backend CORS_ORIGIN=admin.frekkls.com FRONTEND_BASE_URL=https://admin.frekkls.com MAILER_HOST=api.frekkls.com SPARKPOST_API_KEY=... DO_SPACES_KEY_ID=... DO_SECRET_ACCESS_KEY=... DO_BUCKET=... DO_SPACE_ENDPOINT=... SHOP_API_TOKEN=... DELIUS_ASMT_EMAIL=... TAGGED_PRODUCTS_API_TOKEN=...
dokku run console-backend rails db:schema:load
dokku domains:add console-backend api.trendiamo.com
dokku domains:add console-backend api.frekkls.com
dokku ps:scale console-backend web=1 worker=1 scheduler=1
# from your local machine, do the first deploy:
bin/rails deploy

# To setup the shopify.frekkls.com app:

dokku apps:create shopify-app
dokku postgres:create shopify-app-pg
dokku postgres:link shopify-app-pg shopify-app
dokku config:set shopify-app BASE_API_URL=https://shopify.frekkls.com SHOPIFY_API_KEY=... SHOPIFY_SHARED_SECRET=... SHOP_API_URL=... SHOP_API_TOKEN=... ROLLBAR_POST_SERVER_ITEM=...
dokku domains:add shopify-app shopify.frekkls.com
dokku ps:scale shopify-app web=1
# from your local machine, try to do the first deploy:
bin/rails deploy
# dokku run shopify-app rails db:schema:load

# To setup the slack-bot:

mkdir -p /opt/dokku/slack-bot
chown -R dokku:dokku /opt/dokku
dokku docker-options:add slack-bot deploy,run "-v /opt/dokku/slack-bot:/app/files"
# then add the required files to /opt/dokku/slack-bot (git keys and such)
dokku apps:create slack-bot
dokku config:set slack-bot SLACK_API_TOKEN=... BUILD_FOLDER=/tmp GITHUB_KEY_FILE=/app/files/deploy_id_rsa DOKKU_KEY_FILE=/app/files/dokku_id_rsa STATIC_KEY_FILE=/app/files/static_id_rsa LANDING_PAGE_ENV_FILE=/app/files/landing-page/.env PLUGIN_ENV_FILE=/app/files/plugin/.env AWS_CREDENTIALS_FILE=/app/files/credentials
dokku ps:scale slack-bot bot=1
# from your local machine:
bin/deploy

# To install certificates

service nginx stop
certbot certonly --standalone --preferred-challenges http -d api.frekkls.com -d shopify.frekkls.com
service nginx start

mkdir keycert
cp /etc/letsencrypt/live/api.frekkls.com/fullchain.pem keycert/certificate.crt
cp /etc/letsencrypt/live/api.frekkls.com/privkey.pem keycert/key.key
tar -cvf keycert.tar keycert
cat keycert.tar | dokku certs:add console-backend
cat keycert.tar | dokku certs:add shopify-app
rm keycert.tar keycert/certificate.crt keycert/key.key
rmdir keycert

# To renew certificates

# To test renew: `certbot renew --dry-run`
certbot renew
cp /etc/letsencrypt/live/api.frekkls.com/fullchain.pem /home/dokku/console-backend/tls/server.crt
cp /etc/letsencrypt/live/api.frekkls.com/privkey.pem /home/dokku/console-backend/tls/server.key
cp /etc/letsencrypt/live/api.frekkls.com/fullchain.pem /home/dokku/shopify-app/tls/server.crt
cp /etc/letsencrypt/live/api.frekkls.com/privkey.pem /home/dokku/shopify-app/tls/server.key
service nginx restart

# Backups

# To backup the console-backend postgres db:
dokku postgres:backup-auth console-backend-pg <DO_SPACES_KEY_ID> <DO_SECRET_ACCESS_KEY> ams3 s3v4 https://ams3.digitaloceanspaces.com
# To create a backup of the console-backend postgres db:
dokku postgres:backup console-backend-pg console-db-backups
# To schedule a backup of the console-backend postgres db:
dokku postgres:backup-schedule console-backend-pg "0 0 * * *" console-db-backups
# To unschedule the backup of the console-backend postgres db:
# dokku postgres:backup-unschedule console-backend-pg
# To import a backup a dump into the console-backend postgres db:
# download the compressed file and decompress it in your local machine (file name: "export"). Then copy this file to the remote server using the scp command:
# scp export root@46.101.129.17:/root/
# dokku postgres:import console-backend-pg < export
```

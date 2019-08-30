# Digital Ocean: staging droplet

## Description

This droplet has the staging environment. Some apps are managed by dokku: `console-backend`, `shopify-app`, `slack-bot`.

## Commands to setup

```sh
# When creating the droplet, choose the image: Marketplace->Dokku

# Do not finish the online Dokku setup before deploying apps, and do not add keys in the online setup

# TODO: setup a sudo-enabled user called deploy, do the rest with this user.

# TODO: firewall

# To add users to be able to deploy, run in your local machine (make sure to replace vars below):
cat <pub-key-file> | ssh root@167.71.50.172 "sudo sshcommand acl-add dokku <key-id>"

# Add required plugins

dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku plugin:install https://github.com/dokku/dokku-redis.git redis
dokku plugin:install https://github.com/iloveitaly/dokku-rollbar.git

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
dokku config:set console-backend CORS_ORIGIN=admin.pimppls.com FRONTEND_BASE_URL=https://admin.pimppls.com MAILER_HOST=api.pimppls.com SPARKPOST_API_KEY=... DO_SPACES_KEY_ID=... DO_SECRET_ACCESS_KEY=... DO_BUCKET=... DO_SPACE_ENDPOINT=... SHOP_API_TOKEN=... DELIUS_ASMT_EMAIL=... DELIUS_ASMT_EMAIL_BCC=... TAGGED_PRODUCTS_API_TOKEN=... MIXPANEL_API_KEY=... ROLLBAR_POST_SERVER_ITEM=...  ROLLBAR_TOKEN=... PROMOTER_UPGRADE_EMAIL=...
dokku domains:add console-backend api.pimppls.com
dokku ps:scale console-backend web=1 worker=1 scheduler=1
dokku run console-backend rails db:schema:load # fails before first deploy, first deploy then fails the migrate command, repeat this, then deploy again!
# from your local machine, do the first deploy:
bin/rails deploy-staging

# To setup .env files

mkdir -p /var/dotenv/admin
mkdir -p /var/dotenv/plugin # TODO: this one is not done yet
mkdir -p /var/dotenv/plugin-base

vi the .env files inside each folder

# To install certificates

service nginx stop
certbot certonly --standalone --preferred-challenges http -d api.pimppls.com -d admin.pimppls.com -d pimppls.com -d www.pimppls.com -d app-staging.uptous.co
service nginx start

mkdir keycert
cp /etc/letsencrypt/live/api.pimppls.com/fullchain.pem keycert/certificate.crt
cp /etc/letsencrypt/live/api.pimppls.com/privkey.pem keycert/key.key
tar -cvf keycert.tar keycert
cat keycert.tar | dokku certs:add console-backend
rm keycert.tar keycert/certificate.crt keycert/key.key
rmdir keycert

# To renew certificates

# To test renew: `certbot renew --dry-run`
certbot renew
cp /etc/letsencrypt/live/api.pimppls.com/fullchain.pem /home/dokku/console-backend/tls/server.crt
cp /etc/letsencrypt/live/api.pimppls.com/privkey.pem /home/dokku/console-backend/tls/server.key
cp /etc/letsencrypt/live/api.pimppls.com/fullchain.pem /home/dokku/shopify-app/tls/server.crt
cp /etc/letsencrypt/live/api.pimppls.com/privkey.pem /home/dokku/shopify-app/tls/server.key
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
# scp export root@167.71.50.172:/root/
# dokku postgres:import console-backend-pg < export
```

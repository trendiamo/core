# Digital Ocean: console droplet

## Description

This droplet has apps managed by dokku. The apps are: `console-frontend` and `console-backend`.

## Commands to setup

```sh
# When creating the droplet, choose one-click installs: Dokku

# Do not finish the online Dokku setup before deploying apps, and do not add keys in the online setup

# TODO: setup a sudo-enabled user called deploy, do the rest with this user.

# TODO: firewall

# To add users to be able to deploy, run in your local machine (make sure to replace vars below):
cat <pub-key-file> | ssh root@46.101.129.17 "sudo sshcommand acl-add dokku <key-id>"

# To setup the console-frontend app:

dokku apps:create console-frontend
dokku config:set console-frontend BUILDPACK_URL=https://github.com/mars/create-react-app-buildpack.git
dokku config:set console-frontend NODE_ENV=production REACT_APP_API_ENDPOINT=https://api.trendiamo.com
dokku domains:add console-frontend console.trendiamo.com
# from your local machine, do the first deploy:
git subtree push --prefix console-frontend dokku-frontend master

# To setup the console-backend app:

dokku apps:create console-backend
dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku postgres:create console-backend-pg
dokku postgres:link console-backend-pg console-backend
dokku plugin:install https://github.com/dokku/dokku-redis.git redis
dokku redis:create console-backend-redis
dokku redis:link console-backend-redis console-backend
# CORS_ORIGIN allows multiple values (comma-separated), so it cannot be used for the same purpose as FRONTEND_BASE_URL
dokku config:set console-backend CORS_ORIGIN=console.trendiamo.com FRONTEND_BASE_URL=https://console.trendiamo.com MAILER_HOST=api.trendiamo.com SPARKPOST_API_KEY=... DO_SPACES_KEY_ID=... DO_SECRET_ACCESS_KEY=... DO_BUCKET=... DO_SPACE_ENDPOINT=...
dokku run console-backend rails db:schema:load
dokku domains:add console-backend api.trendiamo.com
dokku ps:scale console-backend web=1 worker=1 scheduler=1
# from your local machine, do the first deploy:
bin/rails deploy

# certificates:
add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install certbot

service nginx stop
certbot certonly --standalone --preferred-challenges http -d console.trendiamo.com -d api.trendiamo.com
mkdir keycert
cp /etc/letsencrypt/live/console.trendiamo.com/fullchain.pem keycert/certificate.crt
cp /etc/letsencrypt/live/console.trendiamo.com/privkey.pem keycert/key.key
tar -cvf keycert.tar keycert
cat keycert.tar | dokku certs:add console-backend
cat keycert.tar | dokku certs:add console-frontend
rm keycert.tar keycert/certificate.crt keycert/key.key
rmdir keycert
# To test renew: `certbot renew --dry-run`
# To renew: `certbot renew` or `certbot certonly`
service nginx start

# Backups:

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

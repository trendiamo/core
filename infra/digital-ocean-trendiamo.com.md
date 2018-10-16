# Digital Ocean: trendiamo.com droplet

## Description

This droplet serves the static website at http://trendiamo.com

## Commands to setup

```sh
# TODO: setup a sudo-enabled user called deploy, do the rest with this user.

# apache:
apt install apache2-bin
apt-get update
apt install apache2

# There was some manual configuration of apache rewrites and expires:
a2enmod rewrite
a2enmod expires
vi /etc/apache2/sites-enabled/000-default.conf
vi /etc/apache2/sites-enabled/000-default-le-ssl.conf
sudo systemctl reload apache2

# firewall:
ufw allow OpenSSH
ufw allow "Apache Full"
ufw enable

# certificates:
add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install python-certbot-apache
certbot --apache -d trendiamo.com -d www.trendiamo.com
```

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

mkdir -p /var/www/frekkls.com/html
mkdir -p /var/www/admin/html
mkdir -p /var/www/showcase-demo.frekkls.com/html

vi /etc/apache2/sites-available/000-default.conf
vi /etc/apache2/sites-available/000-default-le-ssl.conf

vi /etc/apache2/sites-available/002-frekkls.com.conf
vi /etc/apache2/sites-available/002-frekkls.com-le-ssl.conf

vi /etc/apache2/sites-available/003-frekkls.com.br.conf
vi /etc/apache2/sites-available/003-frekkls.com.br-le-ssl.conf

vi /etc/apache2/sites-available/004-admin.frekkls.com.conf
vi /etc/apache2/sites-available/004-admin.frekkls.com-le-ssl.conf

vi /etc/apache2/sites-available/005-showcase-demo.frekkls.com.conf
vi /etc/apache2/sites-available/005-showcase-demo.frekkls.com-le-ssl.conf

vi /etc/apache2/sites-available/006-uptous.co.conf
vi /etc/apache2/sites-available/006-uptous.co-le-ssl.conf

a2ensite 002-frekkls.com.conf
a2ensite 003-frekkls.com.br.conf
a2ensite 004-admin.frekkls.com.conf
a2ensite 005-showcase-demo.frekkls.com.conf
a2ensite 006-uptous.co.conf

# these are enabled by certbot
# a2ensite 002-frekkls.com-le-ssl.conf
# a2ensite 003-frekkls.com.br-le-ssl.conf
# a2ensite 004-admin.frekkls.com-le-ssl.conf
# a2ensite 005-showcase-demo.frekkls.com-le-ssl.conf
# a2ensite 006-uptous.co-le-ssl.conf

systemctl reload apache2

# firewall:
ufw allow OpenSSH
ufw allow "Apache Full"
ufw enable

# certificates:
add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install python-certbot-apache
certbot --apache -d trendiamo.com -d www.trendiamo.com -d frekkls.com -d www.frekkls.com -d frekkls.com.br -d www.frekkls.com.br -d admin.frekkls.com -d showcase-demo.frekkls.com -d uptous.co
```

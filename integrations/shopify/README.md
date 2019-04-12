# README

Useful info:

- https://github.com/Shopify/shopify_api#console

## Setup

You'll need to create your `.env` file - ask a team member about this.

```sh
bundle
pg_ctl -D /usr/local/var/postgres start
bin/rails db:create
bin/rails db:schema:load
```

## To be able to deploy

Add to .git/config in the root folder (core):

```sh
git remote add dokku-shopify dokku@46.101.129.17:shopify-app
```

## Run locally

```sh
pg_ctl -D /usr/local/var/postgres start
foreman start
```

## Code checks

```sh
bin/rails t
bin/rubocop
```

## Deploy

```sh
bin/rails deploy
```

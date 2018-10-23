# README

## Setup

Create a Shopify account, go to `/admin/settings/checkout` and make it "Accounts are optional".

You'll need to create your `.env` file, pointing to your Shopify instance. Ask a team member about this.

```sh
bundle
pg_ctl -D /usr/local/var/postgres start
bin/rails db:create
bin/rails db:schema:load
```

## Run locally

```sh
pg_ctl -D /usr/local/var/postgres start
ngrok http 3000 # If you want to allow remote access
bin/rails s
```

## Code checks

```sh
bin/rails t
bin/rubocop
bin/brakeman -q
```

## Deploy

```sh
bin/rails deploy
```

## Interact with APIs

The signup and signin requests are REST, the rest is graphql.

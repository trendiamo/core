# README

## Setup

Create a Shopify account, then follow the setup guide here:
https://shopify.github.io/themekit/#use-a-new-theme

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
bin/rubocop
```

## Deploy

Staging:

```sh
git subtree push --prefix backend staging master
# git push staging `git subtree split --prefix backend master`:master --force # forced deploy (shouldn't be needed)
```

Production:

```sh
git subtree push --prefix backend production master
# git push production `git subtree split --prefix backend master`:master --force # forced deploy (shouldn't be needed)
```

## Interact with APIs

The signup and signin requests are REST, the rest is graphql.

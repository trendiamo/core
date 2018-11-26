# README

## Setup

You'll need to create your `.env` file - ask a team member about this.

```sh
brew install redis
gem install foreman
bundle
pg_ctl -D /usr/local/var/postgres start
bin/rails db:create
bin/rails db:schema:load
bin/rails populate
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
bin/brakeman -q --no-pager
```

## Deploy

```sh
bin/rails deploy
```

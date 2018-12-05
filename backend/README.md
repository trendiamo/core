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

## To be able to deploy

Add to .git/config in the root folder (core):

```
[remote "dokku-backend"]
	url = dokku@46.101.129.17:console-backend
	fetch = +refs/heads/*:refs/remotes/dokku-backend/*
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

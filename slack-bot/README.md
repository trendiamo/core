# README

This is our Slack bot, built with `slack-ruby-bot`. It's called Frekky.

## Setup

You'll need to create your `.env` file - ask a team member about this.

```sh
bundle
```

## To be able to deploy

```sh
git remote add dokku-slack-bot dokku@46.101.129.17:slack-bot
```

## Run locally

```sh
bundle exec ruby lib/frekky.rb
```

## Deploy

bin/deploy

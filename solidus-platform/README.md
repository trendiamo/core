# README

## First setup (don't do this anymore!)

```
bin/rails g spree:install --no-migrate --no-sample --no-seed
rm -rf vendor/assets/*/spree/frontend
```

## Setup

```
bundle
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
```

## Run locally

```
bin/rails s
```

## Code checks

```
bin/rubocop
```

## Deploy

TODO

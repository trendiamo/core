# README

## Setup

```sh
bundle
bin/rails db:create
bin/rails db:schema:load
```

## Run locally

```sh
pg_ctl -D /usr/local/var/postgres start
bin/rails s
```

## Run with remote access

```sh
ngrok http -subdomain=dhtrendiamo 3000
open http://0ba38612.ngrok.io
```

## Deploy

TODO

## curl

```sh
# sign up
curl -H "Content-Type: application/json" -d '{"influencer": {"email": "elon@tsla.com", "password": "password", "password_confirmation": "password"}}' http://localhost:3000/api/v1/influencers/sign_up
TOKEN=YvAz5DqjbHqZUjLqJ3xW

# sign in
curl -H "Content-Type: application/json" -d '{"influencer": {"email": "elon@tsla.com", "password": "password"}}' http://localhost:3000/api/v1/influencers/sign_in
TOKEN=7gsUtb2KVZCx9PdgCDUy

# list pdp's
curl -H "Content-Type: application/json" -H "X-INFLUENCER-EMAIL: elon@tsla.com" -H "X-INFLUENCER-TOKEN: $TOKEN" http://localhost:3000/api/v1/pdps

# create a Like
curl -H "Content-Type: application/json" -d '{"like": {"consumerRef": "123456789", "productRef": "987654321"}}' http://localhost:3000/api/v1/likes

# destroy a Like
curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/v1/likes/3

# retrieve a Product
curl -H "Content-Type: application/json" http://localhost:3000/api/v1/products/1
```

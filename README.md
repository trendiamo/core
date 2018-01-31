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
ngrok http 3000
```

## Code checks

```sh
bin/rubocop
```


## Deploy

```sh
git push heroku master
```

## curl

### consumers

```sh
# sign in
curl -H "Content-Type: application/json" -d '{"consumer": {"email": "dh@trendiamo.com", "password": "dh@trendiamo.com"}}' http://localhost:3000/api/v1/consumers/sign_in
TOKEN=UyubomDYBQCs1av-Swqu

# update me
curl -H "Content-Type: application/json" -H "X-CONSUMER-EMAIL: dh@trendiamo.com" -H "X-CONSUMER-TOKEN: $TOKEN" -X PATCH -d '{ "consumer": { "customer_ref": "0xdeadbeeef" } }' http://localhost:3000/api/v1/consumers/me

# create a Like
curl -H "Content-Type: application/json" -H "X-CONSUMER-EMAIL: dh@trendiamo.com" -H "X-CONSUMER-TOKEN: $TOKEN" -d '{"like": {"consumerRef": "123456789", "productRef": "987654321"}}' http://localhost:3000/api/v1/likes

# destroy a Like
curl -H "Content-Type: application/json" -H "X-CONSUMER-EMAIL: dh@trendiamo.com" -H "X-CONSUMER-TOKEN: $TOKEN" -X DELETE http://localhost:3000/api/v1/likes/3

# retrieve a Product
curl -H "Content-Type: application/json" http://localhost:3000/api/v1/products/1
```

### influencers

```sh
# sign up
curl -H "Content-Type: application/json" -d '{"influencer": {"email": "elon@tsla.com", "password": "password", "password_confirmation": "password"}}' http://localhost:3000/api/v1/influencers/sign_up
TOKEN=YvAz5DqjbHqZUjLqJ3xW

# sign in
curl -H "Content-Type: application/json" -d '{"influencer": {"email": "elon@tsla.com", "password": "password"}}' http://localhost:3000/api/v1/influencers/sign_in
TOKEN=7gsUtb2KVZCx9PdgCDUy

# list pdp's
curl -H "Content-Type: application/json" -H "X-INFLUENCER-EMAIL: elon@tsla.com" -H "X-INFLUENCER-TOKEN: $TOKEN" http://localhost:3000/api/v1/pdps
```

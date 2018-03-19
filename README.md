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

### users

```sh
# sign in
curl -H "Content-Type: application/json" -d '{"user": {"email": "dh@trendiamo.com", "password": "dh@trendiamo.com"}}' http://localhost:3000/api/v1/users/sign_in
TOKEN=UyubomDYBQCs1av-Swqu

# update me
curl -H "Content-Type: application/json" -H "X-USER-EMAIL: dh@trendiamo.com" -H "X-USER-TOKEN: $TOKEN" -X PATCH -d '{ "user": { "customer_ref": "0xdeadbeeef" } }' http://localhost:3000/api/v1/users/me

# create a Like
curl -H "Content-Type: application/json" -H "X-USER-EMAIL: dh@trendiamo.com" -H "X-USER-TOKEN: $TOKEN" -d '{"like": {"userRef": "123456789", "productRef": "987654321"}}' http://localhost:3000/api/v1/likes

# destroy a Like
curl -H "Content-Type: application/json" -H "X-USER-EMAIL: dh@trendiamo.com" -H "X-USER-TOKEN: $TOKEN" -X DELETE http://localhost:3000/api/v1/likes/3

# retrieve a Product
curl -H "Content-Type: application/json" http://localhost:3000/api/v1/products/1
```

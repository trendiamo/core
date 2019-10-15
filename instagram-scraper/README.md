# README

This is our Instagram scraper, a simple Ruby application built using the `open-uri` module and a set of proxies, necessary to bypass Instagram's rate limit.

The scraper can be used with a CLI or a [Sinatra](http://sinatrarb.com/)-based API.

## Setup

You'll need to create your `.env` file and specify a `PROXIES_URL` to scrape proxies from and an `API_KEY` to authenticate - ask a team member about this.

```sh
bundle
```

## CLI

### Run locally

```sh
bin/instagram-scraper [options]
```

### Usage

Print the usage message in your terminal with:

```sh
bin/instagram-scraper -h
```

## API

The API is available at `scraper.uptous.co`.

### Run locally

Start a server with:

```sh
foreman start
```

### Deploy

To be able to deploy run:

```sh
git remote add dokku-scraper dokku@167.71.50.172:instagram-scraper
```

Deploy with:

```
bin/deploy
```

### Endpoints

For a more detailed description check the [docs on Postman](https://documenter.getpostman.com/view/8797404/SVtVSnfz?version=latest).

#### Scrape Brand Posts

Returns a CSV file as attachment, containing the posts matching the specified parameters, or an eventual error in JSON format.

* **URL**

  `/`

* **Method:**

  `GET`

* **Headers**

  * `Authorization=[API_KEY]` **required**

*  **URL Params**

  * `brands=[list]` **required**
  * `keywords=[list]`
  * `min_likes=[number]`
  * `start_date=[date]`
  * `end_date=[date]`
  * `output=[filename]`

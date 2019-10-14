# README

This is our Instagram scraper, a simple Ruby application built using the `open-uri` module and a set of proxies, necessary to bypass Instagram's rate limit.

The scraper can be used with a CLI and a web API, built with [Sinatra](http://sinatrarb.com/).

## Setup

You'll need to create your `.env` file and specify a `PROXIES_URL` to scrape proxies from and an `API_KEY` to authenticate - ask a team member about this.

```sh
bundle
```

## Ruby

Import the scraper in your Ruby file. You will have access to the methods `scrape_brand_info(brand)` and `scrape_brand_posts(brand, options)`:

```ruby
brand_info = scrape_brand_info("nike") # => {:id=>"13460080", :name=>"nike", :username=>"nike", :url=>"https://www.instagram.com/nike"}

options = {
  min_likes: 10_000,
  keywords: "fashion,influencer,blogger",
}
posts = scrape_brand_posts("nike", options) # => array of posts
```

## CLI

### Run locally

```sh
bin/instagram-scraper [options]
```

### Usage

Print the usage message in your terminal with

```sh
bin/instagram-scraper -h
```

## API

### Run locally

Start a server with

```sh
rackup config.ru
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

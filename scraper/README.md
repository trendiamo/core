# README

This is our scraper, a simple Ruby application built using the `open-uri` module and a set of helpers and proxies necessary to bypass APIs rate limit.

The scraper can be used with a CLI or a Sinatra-based API, hosted at [scraper.uptous.co](https://scraper.uptous.co).

## Setup

You'll need to create your `.env` file and specify some variables necessary to scrape content - ask a team member about this.

```sh
bundle
```

## Ruby

Require `scraper.rb` in your file:

```ruby
require_relative "lib/scraper"

# Instagram
scrape_instagram_posts("@_uptous", min_likes: 100, keywords: %w[up to us]) # => array of posts
```

## CLI

### Instagram

Run locally:

```sh
bin/instagram-scraper -T <target> [options]
```

Print the usage message in your terminal:

```sh
bin/instagram-scraper -h
```

## API

For a more detailed description check the [docs on Postman](http://scraper.uptous.co/docs).

### Run locally

Start a local server on port 9292 with:

```sh
foreman start
```

### Deploy

To be able to deploy you need to set a `dokku-scraper` remote:

```sh
git remote add dokku-scraper dokku@167.71.50.172:scraper
```

Deploy with:

```sh
bin/deploy
```

### Instagram

#### Scrape posts from resource

Returns a CSV file as attachment, containing the posts matching the specified parameters, or an eventual error in JSON format.

- **URL**: `/instagram`


- **Method**: `GET`


- **URL Params**:

    - `users=[list]`\*
    - `hashtags=[list]`\*
    - `keywords=[list]`
    - `min_likes=[number]`
    - `start_date=[date]`
    - `end_date=[date]`
    - `output=[filename]`


- **Headers**: `Authorization=[API_KEY]`\*\*


  \* at least one has to be specified

  \*\* required in production

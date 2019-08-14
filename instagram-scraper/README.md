# README

This is our Instagram scraper, a simple command-line Ruby application built using the `open-uri` module and a set of proxies, necessary to bypass Instagram's rate limit.

## Setup

You'll need to create your `.env` file and specify a `PROXIES_URL` to scrape proxies from - ask a team member about this.

```sh
bundle
```

## Run locally

```sh
bin/instagram-scraper [options]
```

Or, if you have `./bin` in your `$PATH`, just

```sh
instagram-scraper [options]
```

## Usage

Print the usage message in your terminal with

```sh
bin/instagram-scraper -h
```

or

```sh
bin/instagram-scraper --help
```

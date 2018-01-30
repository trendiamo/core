# Trendiamo Shopify App

## Setup

```sh
brew tap shopify/shopify
brew install themekit
vi config.yml # ask the team about contents of this file
cd app
yarn
```

## Develop

```sh
theme watch
cd app
API_ENDPOINT=trendiamo-backend.herokuapp.com yarn webpack --watch
```

Note: if `theme watch` shows `409 Conflict` errors, then do a `theme download path/to/file` first.

# Trendiamo Shopify App

## Setup

```sh
brew tap shopify/shopify
brew install themekit
theme configure --password=<API_PASSWORD> --store=<YOUR-STORE>.myshopify.com --themeid=<YOUR-THEME-ID>
API_ENDPOINT=<BACKEND-URL> pushd app; yarn watchp; popd
theme replace -f
```

## Develop

```sh
API_ENDPOINT=<BACKEND-URL> pushd app; yarn watchp; popd
theme watch
```

Note: if `theme watch` shows `409 Conflict` errors, then do a `theme download path/to/file` first.

## Code checks

```sh
pushd app; yarn eslint src; popd
```

# Deploy

staging:

```sh
pushd app; API_ENDPOINT=trendiamo-stgn.herokuapp.com yarn webpack -p --config webpack.prod.js; popd
theme upload -e staging # -f if necessary
```

production:

```sh
pushd app; API_ENDPOINT=trendiamo-production.herokuapp.com yarn webpack -p --config webpack.prod.js; popd
theme upload -e production # -f if necessary
```

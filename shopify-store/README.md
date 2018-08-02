# Trendiamo Shopify App

## Setup

```sh
brew tap shopify/shopify && brew install themekit
theme configure --password=<API_PASSWORD> --store=<YOUR-STORE>.myshopify.com --themeid=<YOUR-THEME-ID>
pushd app; yarn; popd
theme replace -f
# Note: if there are errors with type_base_size do this:
# 1. get data file from production (ask a team member with access)
# 2. upload data file without the setting
# 3. upload the schema file
# 4. upload data file with the setting again
# 5. re-upload theme.
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
pushd app; API_ENDPOINT=trendiamo-prod.herokuapp.com yarn webpack -p --config webpack.prod.js; popd
theme upload -e production # -f if necessary
```

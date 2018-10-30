# Console-frontend

This is a create-react-app project for the console.trendiamo.com UI which our customers use to configure their plugins.

You can read the [default create-react-app README.md](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Setup

```sh
yarn global add cross-env
yarn
```

## Run

```sh
REACT_APP_API_ENDPOINT={backend_hostname} yarn start
```

## Run in prod mode

```sh
REACT_APP_API_ENDPOINT={backend_hostname} yarn build
hs -p9000 build
```

## Deploy

```
yarn deploy
```

## Storybook

https://storybook.js.org/

```
yarn storybook
```

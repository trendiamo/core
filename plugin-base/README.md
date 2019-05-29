# Plugin base

Base components used in both the plugiamo project and console-frontend (for preview).

## Setup

```
yarn
yarn add -P react@^16.0.0 styled-components@^4.2.0 recompose@^0.28.2 lodash.isequal@^4.5.0 react-dom@^16.0.0 lodash.omit@^4.5.0 snarkdown@^1.2.2
```

## Build

```
yarn build-dev && cd ../console-frontend && yarn add ../plugin-base && rm -rf node_modules/plugin-base/node_modules && cd ../plugiamo && yarn add ../plugin-base && rm -rf node_modules/plugin-base/node_modules && cd ../plugin-base
```

## Code checks

```sh
yarn eslint src
```

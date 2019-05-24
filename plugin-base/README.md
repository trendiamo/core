# Plugin base

Base components used in both the plugiamo project and console-frontend (for preview).

## Setup

```
yarn
yarn add -P react@^16.0.0 styled-components@^3.4.0 recompose@^0.28.2 lodash.isequal@^4.5.0 emoji-js@^3.4.1 react-dom@^16.0.0 lodash.omit@^4.5.0 snarkdown@^1.2.2
```

## Build

```
yarn build-dev && cp dist/plugin-base.js ../console-frontend/node_modules/plugin-base/dist/ && cp dist/plugin-base.js ../plugiamo/node_modules/plugin-base/dist/
```

## Code checks

```sh
yarn eslint src
```

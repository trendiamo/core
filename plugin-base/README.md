# Plugin base

Base components used in both the plugiamo project and console-frontend (for preview).

## Setup

```
yarn
yarn add -P react@^16.0.0 styled-components@^3.4.0 recompose@^0.28.2 lodash.isequal@^4.5.0
```

## Build

```
yarn build && cp dist/plugin-base.js ../console-frontend/plugin-base/ && cp dist/plugin-base.js ../plugiamo/plugin-base/
# then go to console-frontend and run `yarn add ./plugin-base`
# then go to plugiamo and run `yarn add ./plugin-base`
```

## Linking Yarn

Go to console-frontend and run:

```
cd plugin-base/ && yarn link && cd ../ && yarn link plugin-base
```

After that plugin-base will automatically reload in console-frontend yarn system after each build.

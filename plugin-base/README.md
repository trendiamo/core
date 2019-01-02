# Plugin base

Base components used in both the plugiamo project and console-frontend (for preview).

## Setup

```
yarn
yarn add -P react recompose styled-components
```

## Build

```
yarn build && cp dist/plugin-base.js ../console-frontend/plugin-base/
# then go to console-frontend and run `yarn add ./plugin-base`
```

# electron-tools

## Init & Configuration

- Init

```shell
npm create vite@latest electron-tools -- --template vue-ts
```

- Electron

```shell
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
npm i -D electron
```

- eslint

```shell
npm i -D eslint
npx eslint --init
# 选择
# To check syntax, find problems, and enforce code style
# JavaScript modules (import/export)
# Vue.js
# use TypeScript
# √ Browser
# Use a popular style guide
# Standard: https://github.com/standard/standard
# JavaScript
```

- husky

```shell
npx husky-init
```

## 依赖

```shell
npm i electron-log
```

```shell
npm i -D @element-plus/icons-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitejs/plugin-vue electron electron-builder element-plus eslint eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-vue husky sass typescript unplugin-auto-import unplugin-vue-components vite vue vue-router vue-tsc
```

## 文档

- [electron-builder](https://www.electron.build)

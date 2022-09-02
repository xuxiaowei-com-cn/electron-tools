# electron-tools

## Configuration

- Electron Install

```
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
npm i -D electron
```

- eslint

```
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

```
npx husky-init
```

- vite vue ts

```
npm create vite@latest electron-tools -- --template vue-ts
```

## 依赖

```
npm i electron-log
```

```
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitejs/plugin-vue electron electron-builder eslint eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-vue husky sass typescript vite vue vue-router vue-tsc
```

## 文档

- [electron-builder](https://www.electron.build)

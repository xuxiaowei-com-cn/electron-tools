# electron-tools

## 打包 & 产物

- Windows 平台
    - Node 16.x、electron 25.0.0 为例（2023-05-30）
        - 支持 ia32：打包大小 62.7 M，命令：`electron:build:win:ia32`
        - 支持 x64：打包大小 67.1 M，命令：`electron:build:win:x64`
        - 同时支持 ia32、x64：打包大小 129 M，命令：`electron:build`。注：命令行参数优先级高于配置文件

| 命令                      | Windows x86 架构 | Windows x64 架构 | 支持 ia32 产物 | 支持 x64 产物 | 同时支持 ia32、x64 产物 |
|-------------------------|----------------|----------------|------------|-----------|------------------|
| electron:build:win:ia32 | ✅              | ✅              | ✅          | ❌         | ❌                |
| electron:build:win:x64  | ❌              | ✅              | ❌          | ✅         | ❌                |
| electron:build          | ❌              | ✅              | ✅          | ✅         | ✅                |

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
    - [Command Line Interface (CLI)](https://www.electron.build/cli)
    - [Publish](https://www.electron.build/configuration/publish)
- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

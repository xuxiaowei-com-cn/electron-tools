# electron-tools

## 打包 & 产物

- Windows 平台
    - Node 16.x/18.x、electron 25.0.1 为例（2023-06-03）
        - 支持 ia32：打包大小 62.5 MB M，命令：`npm run electron:build:win:ia32`
        - 支持 x64：打包大小 66.9 M，命令：`npm run electron:build:win:x64`
        - 同时支持 ia32、x64：打包大小 129 M，命令：`npm run electron:build`
        - 注：命令行参数优先级高于配置文件

| 命令                      | Windows x86 架构 | Windows x64 架构 | 支持 ia32 产物 | 支持 x64 产物 | 同时支持 ia32、x64 产物 |
|-------------------------|----------------|----------------|------------|-----------|------------------|
| electron:build:win:ia32 | ✅              | ✅              | ✅          | ❌         | ❌                |
| electron:build:win:x64  | ❌              | ✅              | ❌          | ✅         | ❌                |
| electron:build          | ❌              | ✅              | ✅          | ✅         | ✅                |

- Linux 平台
    - Node 16.x、electron 25.0.1 为例（2023-06-03）
        - 支持 .deb 产物：打包大小 64.8 M，命令：`npm run electron:build:linux:deb`
        - 支持 .rpm 产物：打包大小 64.7 M，命令：`npm run electron:build:linux:rpm`
        - 支持 .AppImage 产物：打包大小 92.8 M，命令：`npm run electron:build`
        - 支持 .tar.gz 产物：打包大小 88 M，命令：`npm run electron:build`
        - 支持 .tar.xz 产物：打包大小 64.6 M，命令：`npm run electron:build`
        - 注：命令行参数优先级高于配置文件

| 命令                       | 支持 .deb  产物 | 支持 .rpm 产物 | 同时支持 .AppImage、.tar.gz、.tar.xz 产物 |
|--------------------------|-------------|------------|-----------------------------------|
| electron:build:linux:deb | ✅           | ❌          | ❌                                 |
| electron:build:linux:rpm | ❌           | ✅          | ❌                                 |
| electron:build           | ❌           | ❌          | ✅                                 |

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

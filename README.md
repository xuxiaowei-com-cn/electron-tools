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

## 发布 & 更新

- [scheme.json](https://github.com/electron-userland/electron-builder/blob/master/packages/app-builder-lib/scheme.json)
- S3 [electron-builder.json5](electron-builder.json5) 配置如下
    - publish：发布的配置，支持与 mac、win、linux 平级，也支持在 mac、win、linux 中单独配置
        - provider：发布到 S3 时的值为 s3
        - bucket：S3 的 bucket 名称
        - acl：S3 对象储存权限（可能存在无法修改的情况，推荐自己设置文件夹权限），枚举：private、public-read
        - path：S3 对象储存的文件夹，支持的环境变量：platform（平台）、version（版本号）、channel（渠道）等
        - region：S3 对象储存的区域（亚马逊），非亚马逊对象储存固定为 us-east-1 即可
        - endpoint：S3 对象储存的端点（桶）
        - channel：渠道，默认：latest
    - AWS_ACCESS_KEY_ID：环境变量，S3 对象储存的 Access Key，当存在参数为 `--publish always` 时，自动根据环境变量和配置上传产物
    - AWS_SECRET_ACCESS_KEY：环境变量，S3 对象储存的 Secret Key，当存在参数为 `--publish always` 时，自动根据环境变量和配置上传产物
    ```json5
    {
      "publish": [
        {
          "provider": "s3",
          "bucket": "electron-tools",
          "acl": "public-read",
          "path": "/${platform}/${channel}/",
          "region": "us-east-1",
          "endpoint": "http://192.168.0.29:9000/",
          "channel": "latest",
        }
      ]
    }
    ```

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
- [about-npm](https://docs.npmjs.com/about-npm)
    - [configuring-npm](https://docs.npmjs.com/cli/v9/configuring-npm)
        - [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [electron-builder](https://github.com/electron-userland/electron-builder)
    - [scheme.json](https://github.com/electron-userland/electron-builder/blob/master/packages/app-builder-lib/scheme.json)

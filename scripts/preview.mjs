// https://cn.vitejs.dev/guide/api-javascript.html

import { spawn } from 'child_process'
import { build, preview } from 'vite'
import electron from 'electron'
import log from 'electron-log'

// 日志位置：C:\Users\%USERPROFILE%\AppData\Roaming\electron-tools\logs

log.transports.file.fileName = 'preview.log'

const cwdDir = process.cwd()

if (process.platform === 'win32') {
  // Windows 中文
  spawn('chcp', ['65001'], {
    cwd: cwdDir, stdio: 'inherit',
  })
}

;(async () => {

  const previewServer = await preview({
    configFile: 'vite.config.ts',
    server: { host: true }
  })

  previewServer.printUrls()

  process.env.VITE_PREVIEW_URL = previewServer.resolvedUrls.local[0]

  let electronProcess

  log.info('预览模式', process.env.VITE_PREVIEW_URL)

  build({
    build: {
      watch: {},
    },
    plugins: [
      {
        name: 'electron-preview',
        writeBundle() {
          if (electronProcess) {
            log.info('预览模式 重新加载')
            electronProcess.kill()
          }
          electronProcess = spawn(electron.toString(), ['.'], {
            cwd: cwdDir, stdio: 'inherit',
          })
        }
      }
    ]
  }).then(response => {

  })

  // 延时监听 Electron 是否关闭
  const interval = setInterval(async function () {
    if (electronProcess != null) {
      if (electronProcess.exitCode === null) {
        // 开发模式 正常运行
      } else {
        if (electronProcess.exitCode === 0) {
          log.info('预览模式 已关闭')
        } else if (electronProcess.exitCode === 1) {
          log.error('预览模式 意外退出')
        } else {
          log.error('预览模式 未知代码：', electronProcess.exitCode)
        }
        clearInterval(interval) // 取消延时

        // 此处应该 关闭 vite
      }
    }
  }, 1000)
})()

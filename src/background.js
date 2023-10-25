// background.js
// https://www.electronjs.org/docs/latest/tutorial/quick-start#recap
// Modules to control application life and create native browser window
const { app, protocol, BrowserWindow, Notification } = require('electron')
const { autoUpdater, AppUpdater } = require('electron-updater')
const path = require('path')
const log = require('electron-log')
const yargs = require('yargs')
const StoreConfig = require('electron-store')

// 日志文件名
// 日志位置：C:\Users\%USERPROFILE%\AppData\Roaming\electron-tools\logs
log.transports.file.fileName = 'background.log'
// 日志文件等级
// log.transports.file.level =
// 日志控制台等级
// log.transports.console.level =
// 日志文件格式，默认值：'[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}'
// log.transports.file.format =
// 日志文件大小，默认：1048576（1M），超过此大小后会将现有日志移动到 *.old.log，删除当前文件。设置为 0 后，禁用此功能
// log.transports.file.maxSize =

// 创建多实例日志，仅用于储存 electron-updater 的日志，updater 同 log
const logUpdater = log.create('updater')
logUpdater.transports.file.fileName = 'updater.log'

// 日志范围
// const userLog = log.scope('user')

// 设置协议
const PROTOCOL_NAME = 'electron-tools'
log.info('生产模式协议：', PROTOCOL_NAME)

// 设置协议为默认客户端
app.setAsDefaultProtocolClient(PROTOCOL_NAME)

const argv = process.argv
log.info('启动参数', argv)
const args0 = argv.slice(0)
const args1 = argv.slice(1)
const args2 = argv.slice(2)
log.info('args0', args0)
log.info('args1', args1)
log.info('args2', args2)
const options = yargs(args2).options({
  ENV: { type: 'string' }
}).argv
log.log('electron 环境', options.ENV)

const store = new StoreConfig()

const defaultConfigInfo = { // 默认配置信息
  openDevTools: null // 打开开发者工具，默认为空，默认使用程序中的配置，此配置高于程序中的配置
}

const configInfo = store.get('configInfo')
store.set('configInfo', configInfo === undefined ? defaultConfigInfo : configInfo)

log.log('electronStore path', store.path)

let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'build/icon-256x256.ico',
    webPreferences: {
      // webSecurity：默认值：true，设置为 false 则会允许所有跨域，不支持热加载
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  if (process.env.VITE_URL) { // 开发模式
    mainWindow.loadURL(process.env.VITE_URL).then(() => {
      log.info('Vite 开发URL 加载成功')
    }).catch(response => {
      log.error('Vite 开发URL 加载失败', response)
    })
  } else if (process.env.VITE_PREVIEW_URL) { // 预览模式
    mainWindow.loadURL(process.env.VITE_PREVIEW_URL).then(() => {
      log.info('Vite 预览URL 加载成功')
    }).catch(response => {
      log.error('Vite 预览URL 加载失败', response)
    })
  } else { // 生产模式
    protocol.registerFileProtocol(PROTOCOL_NAME, function (request, callback) {
      const local = __dirname.substring(0, __dirname.indexOf(path.sep + 'src'))
      let requestUrl = request.url.substring(PROTOCOL_NAME.length + 2)
      // 删除 #
      // 删除多余的 /
      requestUrl = requestUrl.split('#')[0].replace(/^\/+/, '/')
      // 拼接
      const url = path.join(local, requestUrl)
      // eslint-disable-next-line n/no-callback-literal
      callback({ path: url.toString() })
    })
    mainWindow.loadURL(`${PROTOCOL_NAME}://dist/index.html`).then(() => {
      log.info('Vite 生产文件 加载成功')
    }).catch(response => {
      log.error('Vite 生产文件 加载失败', response)
    })
  }

  // 完成加载
  mainWindow.webContents.on('did-finish-load', () => {
    const beforeSendFilter = { urls: ['https://www.baidu.com/**'] }
    mainWindow.webContents.session.webRequest.onBeforeSendHeaders(beforeSendFilter, (details, callback) => {
      // 发给 https://www.baidu.com/** 修改请求头 User-Agent
      details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/111 (KHTML, like Gecko) electron-tools/222 Chrome/333 Electron/444 Safari/555'
      // eslint-disable-next-line n/no-callback-literal
      callback({ cancel: false, requestHeaders: details.requestHeaders })
    })

    const receivedFilter = { urls: ['https://www.baidu.com/**'] }
    mainWindow.webContents.session.webRequest.onHeadersReceived(receivedFilter, (details, callback) => {
      // https://www.baidu.com/** 的响应修改 Access-Control-Allow-Origin
      details.responseHeaders['Access-Control-Allow-Origin'] = ['*']
      // eslint-disable-next-line n/no-callback-literal
      callback({ cancel: false, responseHeaders: details.responseHeaders })
    })
  })

  if (!app.isPackaged) { // 是否打包
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// //////////////////// 自动更新 开始 ////////////////////

app.on('ready', function () {
  // 强制开发中检查更新（需要再项目根目录中添加 dev-app-update.yml 文件，可参考打包后的产物中查找 app-update.yml 并做相应的修改，用于指定开发中检查更新的配置）
  // autoUpdater.forceDevUpdateConfig = true

  // 启动项目后，立即检查更新
  autoUpdater.checkForUpdates().then((updateCheckResult) => {
    checkForUpdates(updateCheckResult)
  })

  // 每隔 5 分钟，检查一次更新
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify().then(updateCheckResult => {
      checkForUpdates(updateCheckResult)
    })
  }, 1000 * 60 * 5)

  autoUpdater.on('checking-for-update', () => {
    logUpdater.info('checking-for-update 正在检查更新')
    mainWindow.webContents.send('electron-updater-message', '正在检查更新...')
  })
  autoUpdater.on('update-available', (info) => {
    logUpdater.info('update-available 有可用更新', info)
    mainWindow.webContents.send('electron-updater-message', '有可用更新。')
  })
  autoUpdater.on('update-not-available', (info) => {
    logUpdater.info('update-not-available 无可用更新', info)
    mainWindow.webContents.send('electron-updater-message', '无可用更新。')
  })
  autoUpdater.on('error', (err) => {
    logUpdater.error('error 自动更新程序中出错', err)
    mainWindow.webContents.send('electron-updater-message', '自动更新程序中出错：' + err)
  })
  autoUpdater.on('download-progress', (progressInfo) => {
    const transferredFormatBytes = formatBytes(progressInfo.transferred)
    const totalFormatBytes = formatBytes(progressInfo.total)
    const bytesPerSecondFormatBytes = formatBytes(progressInfo.bytesPerSecond)
    const percentFixed = progressInfo.percent.toFixed(2)
    logUpdater.info('download-progress 下载进度', totalFormatBytes, percentFixed + '%', bytesPerSecondFormatBytes + '/s', '(' + transferredFormatBytes + '/' + totalFormatBytes + ')', progressInfo)
    let logMessage = '下载速度：' + bytesPerSecondFormatBytes + '/s'
    logMessage += ' - 下载 ' + percentFixed + '%'
    logMessage += ' (' + transferredFormatBytes + '/' + totalFormatBytes + ')'
    mainWindow.webContents.send('electron-updater-message', logMessage)
  })

  autoUpdater.on('update-downloaded', (info) => {
    logUpdater.info('update-downloaded 下载完成', info)
    mainWindow.webContents.send('electron-updater-message', '更新已下载，退出程序后，自动提示安装')
    // 退出并安装
    // autoUpdater.quitAndInstall()
  })
})

function checkForUpdates (updateCheckResult) {
  logUpdater.info('checkForUpdates 检查更新', updateCheckResult)
  if (updateCheckResult != null) {
    updateCheckResult.downloadPromise.then(() => {
      const notificationContent = AppUpdater.formatDownloadNotification(updateCheckResult.updateInfo.version, app.name, {
        title: '新的更新已准备好安装',
        body: '{appName} 版本 {version} 已下载，将在退出时自动安装'
      })
      new (Notification)(notificationContent).show()
    })
  }
}

function formatBytes (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// //////////////////// 自动更新 结束 ////////////////////

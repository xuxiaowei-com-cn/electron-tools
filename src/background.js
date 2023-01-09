// background.js
// https://www.electronjs.org/docs/latest/tutorial/quick-start#recap
// Modules to control application life and create native browser window
const { app, protocol, BrowserWindow } = require('electron')
const path = require('path')
const log = require('electron-log')

// 日志文件名
// 日志位置：C:\Users\%USERPROFILE%\AppData\Roaming\electron-tools\logs
log.transports.file.fileName = 'background.log'
// 日志文件等级
// log.transports.file.level =
// 日志控制台等级
// log.transports.console.level =
// 日志文件格式
// log.transports.file.format =
// 日志文件大小，默认：1048576（1M），超过此大小后会将现有日志移动到 *.old.log，删除当前文件。设置为 0 后，禁用此功能
// log.transports.file.maxSize =

// 创建多实例日志，log2 同 log
// const log2 = log.create('log2')

// 日志范围
// const userLog = log.scope('user')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  if (process.env.VITE_URL) { // 开发模式
    mainWindow.loadURL(process.env.VITE_URL).then(() => {
      log.info('Vite URL 加载成功')
    }).catch(response => {
      log.error('Vite URL 加载失败', response)
    })
  } else if (process.env.VITE_PREVIEW_FILE) { // 预览模式
    const scheme = 'electron-tools'
    protocol.registerFileProtocol(scheme, function (request, callback) {
      const url = path.join(process.cwd(), request.url.substring(scheme.length + 2))
      // eslint-disable-next-line n/no-callback-literal
      callback({ path: url.toString() })
    })
    mainWindow.loadURL(`${scheme}://${process.env.VITE_PREVIEW_FILE}`).then(() => {
      log.info('Vite 预览文件 加载成功')
    }).catch(response => {
      log.error('Vite 预览文件 加载失败', response)
    })
  } else { // 生产模式
    const scheme = 'electron-tools'
    protocol.registerFileProtocol(scheme, function (request, callback) {
      const url = path.join(process.cwd(), 'resources/app.asar', request.url.substring(scheme.length + 2))
      // eslint-disable-next-line n/no-callback-literal
      callback({ path: url.toString() })
    })
    mainWindow.loadURL(`${scheme}://dist/index.html`).then(() => {
      log.info('Vite 生产文件 加载成功')
    }).catch(response => {
      log.error('Vite 生产文件 加载失败', response)
    })
  }

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

const { ipcRenderer } = require('electron')

// //////////////////// 渲染版本号 ////////////////////

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// //////////////////// 自动更新 开始 ////////////////////

ipcRenderer.on('electron-updater-message', function (event, text) {
  const electronUpdaterMessage = document.getElementById('electron-updater-message')
  if (electronUpdaterMessage) {
    electronUpdaterMessage.innerHTML = text
  }
})

// //////////////////// 自动更新 结束 ////////////////////

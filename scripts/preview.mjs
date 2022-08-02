import { spawn } from 'child_process'
import { build, createServer } from 'vite'
import electron from 'electron'
import path from 'path'
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

const server = await createServer({ configFile: 'vite.config.ts', server: { host: true } });
await server.listen();

process.env.VITE_PREVIEW_FILE = path.join(server.config.build.outDir, 'index.html')

log.info('预览模式', process.env.VITE_PREVIEW_FILE)

let electronProcess = null // electron 进程

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

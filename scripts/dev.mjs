import { spawn } from 'child_process'
import { createServer } from 'vite'
import electron from 'electron'

const cwdDir = process.cwd()

if (process.platform === 'win32') {
    // Windows 中文
    spawn('chcp', ['65001'], {
        cwd: cwdDir, stdio: 'inherit',
    })
}

const server = await createServer({ configFile: 'vite.config.ts', server: { host: true } });
await server.listen();

console.info(server.resolvedUrls)

process.env.VITE_URL = server.resolvedUrls.local[0]

const electronProcess = spawn(electron.toString(), ['.'], {
    cwd: cwdDir, stdio: 'inherit',
})

// 延时监听 Electron 是否关闭
const interval = setInterval(async function () {
    if (electronProcess.exitCode === 0) { // Electron 已关闭
        console.log('开发模式 已关闭')
        clearInterval(interval); // 取消延时
        await server.close() // 关闭 vite
    }
}, 1000)

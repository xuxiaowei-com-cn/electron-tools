import { spawn } from 'child_process'
import { build, createServer } from 'vite'
import electron from 'electron'
import path from 'path'

const cwdDir = process.cwd()

const server = await createServer({ configFile: 'vite.config.ts', server: { host: true } });
await server.listen();

process.env.VITE_PREVIEW_FILE = path.join(server.config.build.outDir, 'index.html')

let electronProcess = null

build({
    build: {
        watch: {},
    },
    plugins: [
        {
            name: 'electron-preview',
            writeBundle() {
                if (electronProcess) {
                    electronProcess.kill()
                }
                electronProcess = spawn(electron.toString(), ['.'], {
                    cwd: cwdDir, stdio: 'inherit',
                })
            }
        }
    ]
}).then(response => {
    // console.log(response)
})

import { spawn } from 'child_process'
import { build, createServer } from 'vite'
import electron from 'electron'
import path from 'path'

const cwdDir = process.cwd()

const server = await createServer({ server: { host: true } });
await server.listen();

process.env.VITE_PREVIEW_FILE = path.join(cwdDir, server.config.build.outDir, 'index.html')

build({
    plugins: [
        {
            name: 'electron-preview',
            writeBundle() {
                spawn(electron.toString(), ['.'], {
                    cwd: cwdDir, stdio: 'inherit',
                })
            }
        }
    ]
}).then(response => {
    // console.log(response)
})

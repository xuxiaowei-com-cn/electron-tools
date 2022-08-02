import { spawn } from 'child_process'
import { createServer } from 'vite'
import electron from 'electron'

const cwdDir = process.cwd()

const server = await createServer({ configFile: 'vite.config.ts', server: { host: true } });
await server.listen();

console.info(server.resolvedUrls)

process.env.VITE_URL = server.resolvedUrls.local[0]

spawn(electron.toString(), ['.'], {
    cwd: cwdDir, stdio: 'inherit',
})

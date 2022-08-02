import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 由于 vite、electron-builder 打包后，均放入到 dist 文件夹下，不好区分，未找到修改 electron-builder 打包后的文件夹，故修改此处
    outDir: 'vite'
  }
})

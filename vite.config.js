import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/202602JP/', // GitHub Pages 若用 xxx.github.io/202602Travel 請與 repo 名稱一致
  plugins: [vue()],
})

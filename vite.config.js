import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        projects: 'projects.html',
      },
    },
  },
})
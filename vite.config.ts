import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  publicDir: 'public',
  base: mode === 'production' ? '/' : '',
  server: {
    host: true,
    port: 5000,
  },
  build: {
    rollupOptions: { output: { dir: './build' } },
    minify: true,
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets/'),
      '@components': resolve(__dirname, './src/components/'),
      '@configs': resolve(__dirname, './src/configs/index.ts'),
      '@constants': resolve(__dirname, './src/constants/index.ts'),
      '@hooks': resolve(__dirname, './src/hooks/index.ts'),
      '@pages': resolve(__dirname, './src/pages/'),
      '@types': resolve(__dirname, './src/types/index.ts'),
      '@utils': resolve(__dirname, './src/utils/index.ts'),
    },
  },
}))

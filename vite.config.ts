import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Chỉ cần thêm dòng base này vào, thay bằng tên repository thực tế của bạn
  base: '/webtrungdaotangnhunghenry/', 
})

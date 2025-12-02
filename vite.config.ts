// vite.config.ts
/**
 * Vite 설정 파일
 * 
 * Vite 빌드 도구의 설정을 정의합니다.
 * React 플러그인을 사용하도록 설정되어 있습니다.
 * (현재 프로젝트는 Next.js를 사용하므로 이 파일은 사용되지 않거나 충돌을 일으킬 수 있습니다.)
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

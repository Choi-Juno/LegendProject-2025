// 파일 경로: pages/_app.tsx
/**
 * Next.js 커스텀 App 컴포넌트
 * 
 * 모든 페이지의 초기화를 처리합니다.
 * 전역 스타일을 임포트하고, 테마 프로바이더 등을 설정할 수 있습니다.
 */

import { AppProps } from 'next/app';
// 전역 스타일 파일 import
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';

// 프로젝트에서 사용할 실제 테마 객체
const theme = {};

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default CustomApp;
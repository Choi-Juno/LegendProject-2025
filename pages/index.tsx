// 파일 경로: pages/index.tsx

import React from 'react';
// 기존 App 컴포넌트 경로 (src/App.tsx)를 기준으로 상대 경로로 import합니다.
import App from '../src/App';
import { NextPage } from 'next';

// Next.js 페이지 컴포넌트의 타입으로 지정하는 것을 권장합니다.
const HomePage: NextPage = () => {
    // 기존 src/main.tsx에서 사용하던 <StrictMode>를 유지하여 앱을 렌더링합니다.
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

export default HomePage;
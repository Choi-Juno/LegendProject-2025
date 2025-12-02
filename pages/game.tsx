// pages/game.tsx
/**
 * 게임 페이지
 * 
 * 실제 오목 게임이 진행되는 페이지입니다.
 * `src/App` 컴포넌트를 렌더링합니다.
 */

import React from 'react';
import App from '../src/App';
import { NextPage } from 'next';

const GamePage: NextPage = () => {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

export default GamePage;

// src/components/Board.tsx

import React from 'react';
import { Player } from '../core/GomokuGame';
import Cell from './Cell';
// [Refactor] import styled from 'styled-components';

interface BoardProps {
    boardState: Player[][];
    boardSize: number;
    onCellClick: (row: number, col: number) => void;
    isGameOver: boolean;
    lastMove: { row: number, col: number } | null;
    winLine: { row: number, col: number }[] | null;
}

// [Refactor] Styled Components 정의 위치
// 1. BoardContainer = styled.div<{ $size: number }> ... (grid 설정)
// 2. CellWrapper = styled.div<{ $row: number; $col: number; $size: number }> ... (border 설정)

const Board: React.FC<BoardProps> = ({ boardState, boardSize, onCellClick, isGameOver, lastMove, winLine }) => {
    // [Refactor] 아래 스타일 객체들을 모두 제거하고 Styled Components로 이동
    const boardContainerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        width: 'min(90vw, 600px)', 
        height: 'min(90vw, 600px)',
        backgroundColor: '#f0d9b5',
        border: '3px solid #333',
        margin: '20px auto',
        boxSizing: 'content-box',
    };

    const lineStyle: React.CSSProperties = {
        borderTop: '1px solid #333',
        borderLeft: '1px solid #333',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const isCoordinateInWinLine = (r: number, c: number) => {
        if (!winLine) return false;
        return winLine.some(coord => coord.row === r && coord.col === c);
    };

    return (
        <div style={boardContainerStyle}>
            {/* [Refactor] 위 div를 <BoardContainer $size={boardSize}> 로 변경 */}
            {boardState.map((row, r) => (
                row.map((cellValue, c) => {
                    // [Refactor] cellStyle 로직을 CellWrapper 내부의 CSS 조건부 스타일로 이동
                    const cellStyle: React.CSSProperties = {
                        ...lineStyle,
                        borderBottom: r === boardSize - 1 ? 'none' : '1px solid #333',
                        borderRight: c === boardSize - 1 ? 'none' : '1px solid #333',
                    };

                    return (
                        <div key={`${r}-${c}`} style={cellStyle}>
                            {/* [Refactor] 위 div를 <CellWrapper $row={r} $col={c} $size={boardSize}> 로 변경 */}
                            <Cell 
                                value={cellValue} 
                                onClick={() => onCellClick(r, c)}
                                isGameOver={isGameOver}
                                isLastMove={lastMove?.row === r && lastMove?.col === c}
                                isOnWinLine={isCoordinateInWinLine(r, c)}
                            />
                        </div>
                    );
                })
            ))}
        </div>
    );
};

export default Board;
// src/components/Board.tsx
/**
 * 오목판 컴포넌트
 * 
 * 게임 보드를 렌더링하고 각 셀(Cell)을 배치합니다.
 * 보드 크기에 따라 그리드를 생성하고, 승리 라인 및 마지막 수를 표시하는 역할을 합니다.
 */

import React from 'react';
import { Player } from '../core/GomokuGame';
import Cell from './Cell';
import styled from 'styled-components';

interface BoardProps {
    boardState: Player[][]; // 현재 보드 상태 (2차원 배열)
    boardSize: number;      // 보드 크기 (예: 15x15)
    onCellClick: (row: number, col: number) => void; // 셀 클릭 핸들러
    isGameOver: boolean;    // 게임 종료 여부
    lastMove: { row: number, col: number } | null; // 마지막 착수 위치
    winLine: { row: number, col: number }[] | null; // 승리 라인 좌표 배열
}

// --- 스타일된 컴포넌트 ---

const BoardContainer = styled.div<{ $size: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$size}, 1fr);
  width: min(90vw, 600px);
  height: min(90vw, 600px);
  background-color: #34495e; /* Dark Slate */
  border: 4px solid #2c3e50;
  margin: 20px auto;
  box-sizing: content-box;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-radius: 4px;
`;

const CellWrapper = styled.div<{ $row: number; $col: number; $size: number }>`
  border-top: 1px solid #5d6d7e;
  border-left: 1px solid #5d6d7e;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* 
     외곽선 처리:
     오목판의 가장자리 선을 깔끔하게 처리하기 위해 마지막 열과 행의 테두리를 제거합니다.
  */
  
  border-right: ${props => props.$col === props.$size - 1 ? 'none' : '1px solid #5d6d7e'};
  border-bottom: ${props => props.$row === props.$size - 1 ? 'none' : '1px solid #5d6d7e'};
`;

const Board: React.FC<BoardProps> = ({ boardState, boardSize, onCellClick, isGameOver, lastMove, winLine }) => {
    // 특정 좌표가 승리 라인에 포함되는지 확인하는 헬퍼 함수
    const isCoordinateInWinLine = (r: number, c: number) => {
        if (!winLine) return false;
        return winLine.some(coord => coord.row === r && coord.col === c);
    };

    return (
        <BoardContainer $size={boardSize}>
            {boardState.map((row, r) => (
                row.map((cellValue, c) => (
                    <CellWrapper key={`${r}-${c}`} $row={r} $col={c} $size={boardSize}>
                        <Cell
                            value={cellValue}
                            onClick={() => onCellClick(r, c)}
                            isGameOver={isGameOver}
                            isLastMove={lastMove?.row === r && lastMove?.col === c}
                            isOnWinLine={isCoordinateInWinLine(r, c)}
                        />
                    </CellWrapper>
                ))
            ))}
        </BoardContainer>
    );
};

export default Board;
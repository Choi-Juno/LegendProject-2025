// src/components/Cell.tsx
import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Player } from "../core/GomokuGame";

// --- Styled Components 정의 ---

const pulse = keyframes`
  from {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
  }
  to {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 0 10px 5px gold;
  }
`;

const CellContainer = styled.div<{ $clickable: boolean }>`
    width: 100%;
    height: 100%;
    position: relative;
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

const Stone = styled.div<{
    $player: Player;
    $isOnWinLine: boolean;
    $isLastMove: boolean;
}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 50%;
    z-index: 10;

    /* 돌 색상 처리 */
    background-color: ${({ $player }) =>
        $player === Player.Human
            ? "#000"
            : $player === Player.AI
            ? "#fff"
            : "transparent"};
    border: ${({ $player }) =>
        $player === Player.AI ? "1px solid #ccc" : "none"};

    /* 승리 라인 하이라이트 */
    ${({ $isOnWinLine }) =>
        $isOnWinLine &&
        css`
            animation: ${pulse} 1s infinite alternate;
            box-shadow: 0 0 10px 5px gold;
        `}

    /* 마지막 수 강조 (승리 라인이 아닐 때만) */
  ${({ $isOnWinLine, $isLastMove }) =>
        !$isOnWinLine &&
        $isLastMove &&
        css`
            box-shadow: 0 0 0 3px red;
        `}
`;

// --- 컴포넌트 구현 ---

interface CellProps {
    value: Player;
    onClick: () => void;
    isGameOver: boolean;
    isLastMove: boolean;
    isOnWinLine: boolean;
}

const Cell: React.FC<CellProps> = ({
    value,
    onClick,
    isGameOver,
    isLastMove,
    isOnWinLine,
}) => {
    const isClickable = !isGameOver && value === Player.Empty;

    return (
        <CellContainer
            $clickable={isClickable}
            onClick={isClickable ? onClick : undefined}
        >
            {value !== Player.Empty && (
                <Stone
                    $player={value}
                    $isOnWinLine={isOnWinLine}
                    $isLastMove={isLastMove}
                />
            )}
        </CellContainer>
    );
};

export default Cell;

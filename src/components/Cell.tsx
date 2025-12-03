// src/components/Cell.tsx
/**
 * 셀(Cell) 컴포넌트
 *
 * 오목판의 각 칸을 나타냅니다.
 * 흑돌/백돌을 표시하고, 승리 시 하이라이트 효과나 마지막 착수 표시를 처리합니다.
 */
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Player } from '../core/GomokuGame';
import { Theme } from '../styles/theme';

// --- Styled Components 정의 ---

const pulse = keyframes`
  from {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
  }
  to {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 0 10px 5px ${({ theme }: { theme: Theme }) => theme.highlightWin};
  }
    box-shadow: 0 0 10px 5px ${({ theme }: { theme: Theme }) => theme.highlightWin};
  }
`;

const popIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const CellContainer = styled.div<{ $clickable: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

const Stone = styled.div<{
  $player: Player;
  $isOnWinLine: boolean;
  $isLastMove: boolean;
  theme: Theme;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  height: 85%;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  animation: ${popIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${popIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* 가시성 확보를 위한 테두리: 흑돌은 흰색, 백돌은 검은색 테두리 */
  border: 1px solid ${({ $player }) => ($player === Player.Human ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)')};

  /* 돌 색상 처리 (3D Gradient) */
  /* theme.stoneBlack/White는 이제 단색(Hex)이므로 그라디언트 내에서 사용 가능 */
  background: ${({ $player, theme }) =>
    $player === Player.Human
      ? `radial-gradient(circle at 30% 30%, #666, ${theme.stoneBlack})`
      : $player === Player.AI
        ? `radial-gradient(circle at 30% 30%, #fff, ${theme.stoneWhite})`
        : 'transparent'};

  /* 투명한 돌은 그림자 제거 */
  box-shadow: ${({ $player }) =>
    $player === Player.Empty ? 'none' : '2px 2px 4px rgba(0, 0, 0, 0.5), inset -2px -2px 4px rgba(0,0,0,0.2)'};

  /* 승리 라인 하이라이트 */
  ${({ $isOnWinLine }) =>
    $isOnWinLine &&
    css`
      /* 승리 시 돌이 반짝이는 애니메이션 효과 */
      animation: ${pulse} 1s infinite alternate;
      box-shadow: 0 0 15px 5px ${({ theme }) => theme.highlightWin};
    `}

  /* 마지막 수 강조 (승리 라인이 아닐 때만) */
  ${({ $isOnWinLine, $isLastMove }) =>
    !$isOnWinLine &&
    $isLastMove &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        height: 30%;
        background-color: ${({ theme }) => theme.highlightLast};
        border-radius: 50%;
        box-shadow: 0 0 5px ${({ theme }) => theme.highlightLast};
      }
    `}
`;

// --- 컴포넌트 구현 ---

interface CellProps {
  value: Player;
  onClick: () => void;
  isGameOver: boolean;
  isLastMove: boolean;
  isOnWinLine: boolean;
  heuristicScore?: number;
  checkForbidden: () => boolean;
}

const Cell: React.FC<CellProps> = ({
  value,
  onClick,
  isGameOver,
  isLastMove,
  isOnWinLine,
  heuristicScore,
  checkForbidden,
}) => {
  const isClickable = !isGameOver && value === Player.Empty;
  const [isForbidden, setIsForbidden] = React.useState(false);

  const handleMouseEnter = () => {
    if (isClickable && checkForbidden()) {
      setIsForbidden(true);
    }
  };

  const handleMouseLeave = () => {
    setIsForbidden(false);
  };

  // 점수에 따른 색상 계산 (히트맵)
  let backgroundColor = 'transparent';
  if (heuristicScore !== undefined && value === Player.Empty) {
    if (heuristicScore > 1000) backgroundColor = 'rgba(255, 0, 0, 0.5)'; // 매우 위험/좋음
    else if (heuristicScore > 100) backgroundColor = 'rgba(255, 165, 0, 0.4)'; // 위험/좋음
    else if (heuristicScore > 10) backgroundColor = 'rgba(255, 255, 0, 0.3)'; // 보통
  }

  return (
    <CellContainer
      $clickable={isClickable}
      onClick={isClickable ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 히트맵 오버레이 */}
      {heuristicScore !== undefined && value === Player.Empty && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor,
            borderRadius: '50%',
            transform: 'scale(0.6)',
            pointerEvents: 'none',
          }}
        />
      )}
      {value !== Player.Empty && (
        <Stone $player={value} $isOnWinLine={isOnWinLine} $isLastMove={isLastMove} />
      )}
      {/* 금지수 표시 (X) */}
      {isForbidden && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.5rem',
            color: 'red',
            fontWeight: 'bold',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          ✕
        </div>
      )}
    </CellContainer>
  );
};

export default Cell;

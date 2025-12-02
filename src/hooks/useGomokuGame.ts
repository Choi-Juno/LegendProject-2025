// src/hooks/useGomokuGame.ts
/**
 * Gomoku 게임 로직을 React 컴포넌트에서 쉽게 사용할 수 있도록 래핑한 커스텀 Hook입니다.
 * 게임 인스턴스를 생성하고 상태를 동기화합니다.
 */

import { useState, useCallback } from 'react';
import { GomokuGame, Player, GameState } from '../core/GomokuGame';

export const useGomokuGame = () => {
    const [gameInstance, setGameInstance] = useState(() => new GomokuGame());

    const [boardState, setBoardState] = useState<Player[][]>(gameInstance.getBoardState());
    const [currentPlayer, setCurrentPlayer] = useState<Player>(gameInstance.getCurrentPlayer());
    const [gameState, setGameState] = useState<GameState>(gameInstance.getGameState());
    const [lastMove, setLastMove] = useState(gameInstance.getLastMove());
    const [winLine, setWinLine] = useState(gameInstance.getWinLine());

    // 게임 상태를 React 상태로 동기화하는 함수
    const updateGameState = useCallback((game: GomokuGame) => {
        setBoardState(game.getBoardState().map(row => [...row]));
        setCurrentPlayer(game.getCurrentPlayer());
        setGameState(game.getGameState());
        setLastMove(game.getLastMove());
        setWinLine(game.getWinLine());
    }, []);

    // 인간 플레이어의 착수 처리
    const handleHumanMove = useCallback((row: number, col: number) => {
        if (gameInstance.getGameState() !== GameState.Playing) return;

        const moveSuccess = gameInstance.makeMove(row, col);

        if (moveSuccess) {
            updateGameState(gameInstance);

            if (gameInstance.getCurrentPlayer() === Player.AI && gameInstance.getGameState() === GameState.Playing) {
                setTimeout(() => {
                    gameInstance.handleAIMove();
                    updateGameState(gameInstance);
                }, 500);
            }
        }
    }, [gameInstance, updateGameState]);

    // ⏪ Undo 기능
    const undoMove = useCallback(() => {
        if (gameInstance.undoMove()) {
            updateGameState(gameInstance);
            return true;
        }
        return false;
    }, [gameInstance, updateGameState]);

    // 게임 재시작
    const restartGame = useCallback(() => {
        const newGame = new GomokuGame();
        setGameInstance(newGame);
        updateGameState(newGame);
    }, [updateGameState]);

    return {
        boardState,
        currentPlayer,
        gameState,
        handleHumanMove,
        restartGame,
        boardSize: gameInstance.getBoardSize(),
        lastMove,
        winLine,
        undoMove,
    };
};
import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import { getStockfishMove } from "../utils/stockfishApi";

export default function useChessGame(playerColor = "w", initialTimeSeconds = 5 * 60, playAudioForMove) {
  const [game, setGame] = useState(new Chess());

  const isPlayerTurn = game.turn() === playerColor;

  const onDrop = useCallback(
    async (source, target) => {
      if (!isPlayerTurn) return false;

      try {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn());

        const move = gameCopy.move({
          from: source,
          to: target,
          promotion: "q",
        });

        if (!move) return false;
        playAudioForMove(move);
        setGame(gameCopy);

        const response = await getStockfishMove(gameCopy.fen());
        if (!response) return true;

        const updatedGame = new Chess();
        updatedGame.loadPgn(gameCopy.pgn());

        const move2 = updatedGame.move({
          from: response.bestmove.slice(0, 2),
          to: response.bestmove.slice(2, 4),
          promotion: response.bestmove[4] || "q",
        });

        if (move2) {
          playAudioForMove(move2);
          setGame(updatedGame);
        }

        return true;
      } catch (err) {
        console.log("Illegal move?", err);
        return false;
      }
    },
    [game, isPlayerTurn, playAudioForMove]
  );

  const onTakeback = useCallback(() => {
    const newGame = new Chess();
    newGame.loadPgn(game.pgn());

    const playerIsWhite = playerColor === "w";
    const currentTurn = newGame.turn(); // 'w' or 'b'

    if (
      (playerIsWhite && currentTurn === "w") || 
      (!playerIsWhite && currentTurn === "b")
    ) {
      newGame.undo();
      newGame.undo();
    } else {
      newGame.undo();
    }

    setGame(newGame);
  }, [game, playerColor]);

  const getStatusText = useCallback(() => {
    if (game.isGameOver()) return "Game Over";
    return game.turn() === "w" ? "White to move" : "Black to move";
  }, [game]);

  return {
    game,
    onDrop,
    onTakeback,
    isPlayerTurn,
    getStatusText,
  };
}
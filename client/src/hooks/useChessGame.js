import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import { getStockfishMove } from "../utils/stockfishApi";

export default function useChessGame(playerColor = "w", initialTimeSeconds = 5 * 60, playAudioForMove) {
  const [game, setGame] = useState(new Chess());
  const [gameResult, setGameResult] = useState(null); // null | "white" | "black" | "draw"

  const isPlayerTurn = game.turn() === playerColor;

const getGameResult = (chessInstance) => {
  if (!chessInstance.isGameOver()) return null;

  if (chessInstance.isCheckmate()) {
    return {
      winner: chessInstance.turn() === "w" ? "black" : "white",
      reason: "checkmate",
    };
  }

  if (chessInstance.isStalemate()) {
    return { winner: null, reason: "stalemate" };
  }

  if (chessInstance.isInsufficientMaterial()) {
    return { winner: null, reason: "insufficient_material" };
  }

  if (chessInstance.isDraw()) {
    return { winner: null, reason: "draw" };
  }

  return { winner: null, reason: "unknown" };
};


  const onDrop = useCallback(
    async (source, target) => {
      if (!isPlayerTurn) return false;

    //  try {
     
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

        const result = getGameResult(gameCopy);
        if (result) setGameResult(result);

        if (result) return true;

        // Bot move delay
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        const waitMs = Math.floor(Math.random() * 3000) + 1000;
        await delay(waitMs);

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

          const result2 = getGameResult(updatedGame);
          console.log(result2);
          if (result2) {
            console.log("setting game result");
                 console.log(result2);
            setGameResult(result2);
          }
        }

        return true;
      // } catch (err) {
      //   console.log("Illegal move?", err);
      //   return false;
      // }
    },
    [game, isPlayerTurn, playAudioForMove]
  );

  const onTakeback = useCallback(() => {
    const newGame = new Chess();
    newGame.loadPgn(game.pgn());

    const playerIsWhite = playerColor === "w";
    const currentTurn = newGame.turn();

    if ((playerIsWhite && currentTurn === "w") || (!playerIsWhite && currentTurn === "b")) {
      newGame.undo();
      newGame.undo();
    } else {
      newGame.undo();
    }

    setGame(newGame);
    setGameResult(null); // reset game result on takeback
  }, [game, playerColor]);

  const getStatusText = useCallback(() => {
    if (gameResult === "draw") return "Game Drawn.";
    if (gameResult === "white") return "White Wins!";
    if (gameResult === "black") return "Black Wins!";
    if (game.isGameOver()) return "Game Over.";
    return game.turn() === "w" ? "White to move" : "Black to move";
  }, [game, gameResult]);

  return {
    game,
    onDrop,
    onTakeback,
    isPlayerTurn,
    getStatusText,
    gameResult,       // expose for your UI to show endgame overlay
  };
}

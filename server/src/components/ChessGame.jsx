import React from "react";
import { Chessboard } from "react-chessboard";
import ChessControlls from "./ChessControlls";
import useChessGame from "../hooks/useChessGame";
import useChessTimer from "../hooks/useChessTimer";
import useMoveAudio from "../hooks/useMoveAudio";
import styles from "../styles/ChessGame.module.css"; 

const defaultWidth = 700;
const moveSoundSrc = "/ChessMoveDefault.mp3";
const captureSoundSrc = "/ChessMoveCapture.mp3";

export default function ChessGame() {
  const playAudioForMove = useMoveAudio(moveSoundSrc, captureSoundSrc);

  const {
    game,
    onDrop,
    onTakeback,
    isPlayerTurn,
    getStatusText,
  } = useChessGame("w", 5 * 60, playAudioForMove);

  const { whiteTime, blackTime } = useChessTimer(game, 5 * 60);

  const onResign = () => {
    alert("Resign clicked - add your resign logic here");
  };

  const onAbort = () => {
    alert("Abort clicked - add your abort logic here");
  };

  const boardWidth = defaultWidth;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div>
          <p className={styles.status}>{getStatusText()}</p>
          <Chessboard
            id="main-board"
            position={game.fen()}
            onPieceDrop={onDrop}
            arePiecesDraggable={isPlayerTurn}
            boardWidth={boardWidth}
            customBoardStyle={{ borderRadius: "12px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}
          />
        </div>

        <ChessControlls
          whiteTime={whiteTime}
          blackTime={blackTime}
          turn={game.turn()}
          boardWidth={boardWidth}
          onTakeback={onTakeback}
          onResign={onResign}
          onAbort={onAbort}
        />
      </div>
    </div>
  );
}
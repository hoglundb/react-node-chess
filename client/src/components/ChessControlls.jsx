import React from "react";
import styles from "../styles/ChessControlls.module.css";

export default function ChessControlls({
  whiteTime,
  blackTime,
  turn,
  boardWidth,
  onResign,
  onAbort,
  onTakeback,
}) {
  const clockHeight = boardWidth * 1;
  const clockWidth = clockHeight * 0.4;

  const fontSize = clockHeight * 0.05;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Dynamic inline style only for font size (optional)
  const dynamicFontSizeStyle = { fontSize };

  return (
    <div
      className={styles.container}
      style={{ height: clockHeight, width: clockWidth, fontSize }}
    >
      <div className={turn === "b" ? styles.blackTurn : styles.blackNotTurn} style={dynamicFontSizeStyle}>
        Black: {formatTime(blackTime)}
      </div>

      <div className={styles.buttons}>
        <button onClick={onResign} className={styles.button} style={{ fontSize: fontSize * 0.8 }}>
          Resign
        </button>
        <button onClick={onAbort} className={styles.button} style={{ fontSize: fontSize * 0.8 }}>
          Abort
        </button>
        <button onClick={onTakeback} className={styles.button} style={{ fontSize: fontSize * 0.8 }}>
          Takeback
        </button>
      </div>

      <div className={turn === "w" ? styles.whiteTurn : styles.whiteNotTurn} style={dynamicFontSizeStyle}>
        White: {formatTime(whiteTime)}
      </div>
    </div>
  );
}
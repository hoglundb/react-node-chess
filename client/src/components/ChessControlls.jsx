import React from "react";
import styles from "../styles/ChessControlls.module.css";

export default function ChessControlls({
  whiteTime,
  blackTime,
  turn,
  boardWidth,
  onQuit,
  onTakeback,
  selectedBot
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
    {/* Group black clock and bot info */}
    <div>
      <div className={turn === "b" ? styles.blackTurn : styles.blackNotTurn} style={dynamicFontSizeStyle}>
        Black: {formatTime(blackTime)}
      </div>

      {selectedBot && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: 0 }}>
          <img
            src={selectedBot.image}
            alt={selectedBot.name}
            style={{ width: 40, height: 55, borderRadius: "50%" }}
          />

          <div>
           <div style={{ fontSize: "25px"}}>{selectedBot.name}</div>
            <div style={{ fontSize: "19px"}}>Rating: {selectedBot.rating}</div>
          </div>
        </div>
      )}
    </div>

    <div className={styles.buttons}>
      <button onClick={onQuit} className={styles.button} style={{ fontSize: fontSize * 0.8 }}>
        Quit
      </button>
      <button onClick={onTakeback} className={styles.button} style={{ fontSize: fontSize * 0.8 }}>
        Takeback
      </button>
    </div>

    <div
      className={turn === "w" ? styles.whiteTurn : styles.whiteNotTurn}
      style={dynamicFontSizeStyle}
    >
      White: {formatTime(whiteTime)}
    </div>
  </div>
);

}
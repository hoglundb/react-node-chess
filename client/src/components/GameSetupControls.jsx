import React from "react";
import BotSelector from "./BotSelector";
import TimeControlSelector from "./TimeControlSelector";
import StartButton from "./StartButton";

export default function GameSetupControls({
  selectedBot,
  onBotChange,
  selectedTimeControl,
  onTimeControlChange,
  onStartGame,  // callback for start button
}) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <TimeControlSelector
          value={selectedTimeControl}
          onChange={onTimeControlChange}
        />
      </div>

      <BotSelector value={selectedBot} onChange={onBotChange} />
      
      <StartButton onClick={onStartGame}/>
     
    </div>
  );
}

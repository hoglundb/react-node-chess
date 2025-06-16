import React, { useState } from "react";
import ChessGame from "./components/ChessGame";
import GameSetupControls from "./components/GameSetupControls"; // import the new combined component
import "./App.css";

function App() {
  const [botLevel, setBotLevel] = useState(1);
  const [timeControlMinutes, setTimeControlMinutes] = useState(5);

  return (
    <div className="app-container">
      <h1 style = {{margin:"20px"}} >My React Chess App</h1>
      <h2 style={{ margin: "2px" }}>Select a bot and time control</h2>

      <GameSetupControls
        selectedBot={botLevel}
        onBotChange={setBotLevel}
        selectedTimeControl={timeControlMinutes}
        onTimeControlChange={setTimeControlMinutes}
      />

      {/* Uncomment when ready to render the game */}
      {/* <ChessGame botLevel={botLevel} timeControl={timeControlMinutes} /> */}
    </div>
  );
}

export default App;

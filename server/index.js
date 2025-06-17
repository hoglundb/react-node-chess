const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Chess backend API is running");
});


app.get("/api/stockfish", async (req, res) => {
  const { fen, depth = 12 } = req.query;
  console.log(req.url);
  if (!fen) {
    return res.status(400).json({ error: "FEN string is required." });
  }

  try {
    const apiUrl = "https://stockfish.online/api/s/v2.php";
    const response = await axios.get(apiUrl, {
      params: { fen, depth },
    });

    const data = response.data;

    if (!data.success) {
      return res.status(500).json({ error: "Stockfish API error", details: data.data });
    }

    // Parse the best move cleanly from continuation or bestmove string
    let nextMove = null;
    if (data.continuation) {
      const moves = data.continuation.trim().split(" ");
      if (moves.length > 0) nextMove = moves[0];
    }
    if (!nextMove && data.bestmove) {
      const parts = data.bestmove.split(" ");
      if (parts.length >= 2) nextMove = parts[1];
    }
    
    res.json({
      bestmove: nextMove,
      evaluation: data.evaluation,
      mate: data.mate,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to reach Stockfish API", details: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

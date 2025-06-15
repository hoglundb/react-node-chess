import { useState } from "react";
import axios from "axios";

export default function useStockfish() {
  const [lastMove, setLastMove] = useState(null);

  async function sendFen(fen) {
    try {
      const response = await axios.post("http://localhost:4000/api/stockfish", {
        fen,
        depth: 12,
      });

      const { bestmove } = response.data;
      if (bestmove) {
        // Extract actual move part: "bestmove e2e4 ponder ..." → "e2e4"
        const move = bestmove.split(" ")[1];
        const from = move.slice(0, 2);
        const to = move.slice(2, 4);

        setLastMove({ from, to });
      } else {
        console.warn("No bestmove found in Stockfish response.");
      }
    } catch (err) {
      console.error("Error fetching best move:", err);
    }
  }

  return {
    sendFen,
    lastMove,
  };
}

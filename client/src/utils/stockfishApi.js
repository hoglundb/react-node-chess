export async function getStockfishMove(fen, depth = 12) {
  try {
    const url = `/api/stockfish?fen=${encodeURIComponent(fen)}&depth=${depth}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
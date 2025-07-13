export function calculateWinner(squares: ('B' | 'W' | null)[][]) {
  const size = 15;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const player = squares[r][c];
      if (player) {
        if (c + 4 < size &&
            player === squares[r][c+1] &&
            player === squares[r][c+2] &&
            player === squares[r][c+3] &&
            player === squares[r][c+4]) {
          return player;
        }
        if (r + 4 < size &&
            player === squares[r+1][c] &&
            player === squares[r+2][c] &&
            player === squares[r+3][c] &&
            player === squares[r+4][c]) {
          return player;
        }
        if (r + 4 < size && c + 4 < size &&
            player === squares[r+1][c+1] &&
            player === squares[r+2][c+2] &&
            player === squares[r+3][c+3] &&
            player === squares[r+4][c+4]) {
          return player;
        }
        if (r + 4 < size && c - 4 >= 0 &&
            player === squares[r+1][c-1] &&
            player === squares[r+2][c-2] &&
            player === squares[r+3][c-3] &&
            player === squares[r+4][c-4]) {
          return player;
        }
      }
    }
  }
  return null;
}

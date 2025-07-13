import React from 'react';
import Square from './Square';
import { calculateWinner } from '../utils/gameLogic';

interface BoardProps {
  xIsNext: boolean;
  squares: ('B' | 'W' | null)[][];
  onPlay: (nextSquares: ('B' | 'W' | null)[][]) => void;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  function handleClick(i: number, j: number) {
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    const nextSquares = squares.map(row => [...row]);
    if (xIsNext) {
      nextSquares[i][j] = 'B';
    } else {
      nextSquares[i][j] = 'W';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'B' : 'W');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((row, i) => (
          row.map((_square, j) => (
            <Square
              key={`${i}-${j}`}
              value={squares[i][j]}
              onClick={() => handleClick(i, j)}
            />
          ))
        ))}
      </div>
    </>
  );
};

export default Board;

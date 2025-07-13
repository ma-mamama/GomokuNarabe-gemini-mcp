import { useState, useEffect } from 'react';
import Board from './components/Board';
import ConfettiAnimation from './components/ConfettiAnimation';
import { calculateWinner } from './utils/gameLogic';
import './App.css';

function App() {
  const [history, setHistory] = useState([Array(15).fill(null).map(() => Array(15).fill(null))]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showComplimentPopup, setShowComplimentPopup] = useState(false); // ポップアップ表示状態
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);

  useEffect(() => {
    if (winner) {
      setShowComplimentPopup(true);
    }
  }, [winner]);

  function handlePlay(nextSquares: ('B' | 'W' | null)[][]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setShowComplimentPopup(false); // 履歴に戻る際にポップアップを非表示にする
  }

  function resetGame() {
    setHistory([Array(15).fill(null).map(() => Array(15).fill(null))]);
    setCurrentMove(0);
    setShowComplimentPopup(false); // ゲームリセット時にポップアップを非表示にする
  }

  const moves = history.map((_squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const complimentMessage = winner === 'B' ? '黒の勝利！素晴らしい戦略でした！' : '白の勝利！見事な一手でした！';

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        {winner && (
          <button onClick={resetGame} className="reset-button">
            Play Again
          </button>
        )}
      </div>
      <ConfettiAnimation active={!!winner} />

      {showComplimentPopup && winner && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{complimentMessage}</h2>
            <p>おめでとうございます！</p>
            <button onClick={resetGame} className="popup-close-button">
              閉じる & もう一度プレイ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import React from 'react';

interface SquareProps {
  value: 'B' | 'W' | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  const pieceClass = value === 'B' ? 'black-piece' : value === 'W' ? 'white-piece' : '';
  return (
    <button className="square" onClick={onClick}>
      {value && <div className={`piece ${pieceClass}`}></div>}
    </button>
  );
};

export default Square;

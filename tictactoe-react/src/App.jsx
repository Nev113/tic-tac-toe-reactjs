import { useState } from 'react'


function Square({ value, onSquareClick }){
  return <button onClick={onSquareClick} className='square'>{value}</button>
}
function Board({squares, isXNext, onPlay}){
  function HandleClick(i){
    if(squares[i] || calculateWinner(squares)) return;
    const nextSquare = squares.slice();
    nextSquare[i] = (isXNext) ? 'X' : 'O';
    onPlay(nextSquare)
  }

  const winner = calculateWinner(squares);
  console.log(winner)
  let status;
  if(winner){
    status = 'Pemenang => ' + winner;
  }else{
    status= 'Next Player : ' + ((isXNext) ? 'X' : 'O');
  }
  return <>
  <div className='board'>
  <Square value={squares[0]} onSquareClick={() => HandleClick(0)}/>
  <Square value={squares[1]} onSquareClick={() => HandleClick(1)}/>
  <Square value={squares[2]} onSquareClick={() => HandleClick(2)}/>
  <Square value={squares[3]} onSquareClick={() => HandleClick(3)}/>
  <Square value={squares[4]} onSquareClick={() => HandleClick(4)}/>
  <Square value={squares[5]} onSquareClick={() => HandleClick(5)}/>
  <Square value={squares[6]} onSquareClick={() => HandleClick(6)}/>
  <Square value={squares[7]} onSquareClick={() => HandleClick(7)}/>
  <Square value={squares[8]} onSquareClick={() => HandleClick(8)}/>
  </div>
  <p>{status}</p>
  </>
}

export default function Game(){
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setIsXNext(nextMove % 2 == 0)
  }
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsXNext(!isXNext);
  };
  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0){
      description = 'Goto Move #' + move; 
    }else{
      description = 'Goto Game Start';
    };
    return (
      <li key={move} onClick={() => jumpTo(move)}><button>{description}</button></li>
    )
  })
  return (
    <div className='game'>
      <div className='game-board'>
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i ++){
    let [a, b, c] = lines[i];
    if(squares[a] == squares[b] && squares[b] && squares[c]){
      return squares[a];
    }
  }
  return false;
}
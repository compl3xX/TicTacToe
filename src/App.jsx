import { useState } from "react";

import "./App.css";

export default function App() {

  const [board, setBoard] = useState(Array(9).fill(null));

  const [player, setPlayer] = useState('X');

  const [winner, setWinner] = useState(null)

  const [gameOver, setGameover] = useState(false)

  const [gameStart, setGamestart] = useState(false)


  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWin = (board, player) => {

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }

    return false;
  };


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setPlayer('X')
    setWinner(null)
    setGameover(false)
    setGamestart(false)
  }



  const handelCellCLick = (indx) => {

    if (gameOver || !gameStart) return;

    if (board[indx] === null && !gameOver) {

      const newBoard = [...board];

      newBoard[indx] = player;

      setBoard(newBoard);



      if (checkWin(newBoard, player)) {
        setWinner(player)
        setGameover(true)

      }

      else {
        setPlayer(player === 'X' ? "O" : "X");
      }

    }

  };

  const renderCell = (indx) => (
    <button
      className="item"
      onClick={() => {
        handelCellCLick(indx);
      }}
      key={indx}
    >
      {board[indx]}
    </button>
  );

  return (

    <div>

      <div className="container">
        {board.map((item, index) => renderCell(index))}
      </div>

      {
        gameStart && (
          <div style={{ marginTop: '5px' }} >
            {
              winner
                ? <div className="playerLabel">Player {player} Won</div>
                : <div className="playerLabel">Player {player} turn </div>
            }
          </div>
        )

      }

      {
        gameOver
          ? <button style={{ marginLeft: "48%", marginTop: '10px' }} onClick={resetGame}>Reset</button>
          : (!gameStart && <button style={{ marginLeft: "48%", marginTop: '10px' }}
            onClick={() => setGamestart(true)}>Start</button>)
      }


    </div>
  );
}

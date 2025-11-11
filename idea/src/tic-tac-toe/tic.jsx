import { useState } from "react";
import style from "./styel.module.css";

function Cell({ value, OnClickingTheCell }) {
  return (
    <button
      className={style.cell}
      data-playing={value}
      onClick={OnClickingTheCell}
      id="btn"
    >
      {value}
    </button>
  );
}

function Button({ value, HandleClick }) {
  return (
    <>
      <button onClick={HandleClick}>{value}</button>
    </>
  );
}

function FindWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log(squares[a], squares[b], squares[c]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  console.log("");

  return null;
}

function Board({ playing, squares, onPlay }) {
  const Click = (i) => {
    if (squares[i] || FindWinner(squares)) {
      return;
    }

    const nextSquares = [...squares];
    if (playing) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  };

  const DisableButtons = () => {
    const buttons = document.querySelectorAll("#btn");
    buttons.forEach((button) => {
      button.classList.add(style.won);
    });
  };

  const winner = FindWinner(squares);
  let status;

  if (winner) {
    status = <>Winner : {winner}</>;
    DisableButtons();
  } else {
    status = <>Current Turn : {playing ? "X" : "O"}</>;
  }

  return (
    <>
      <div className={style.CurrentlyPlaying}>{status}</div>
      <div className={style.tictac}>
        <div className={style.row1}>
          <Cell value={squares[0]} OnClickingTheCell={() => Click(0)} />
          <Cell value={squares[1]} OnClickingTheCell={() => Click(1)} />
          <Cell value={squares[2]} OnClickingTheCell={() => Click(2)} />
        </div>
        <div className={style.row2}>
          <Cell value={squares[3]} OnClickingTheCell={() => Click(3)} />
          <Cell value={squares[4]} OnClickingTheCell={() => Click(4)} />
          <Cell value={squares[5]} OnClickingTheCell={() => Click(5)} />
        </div>
        <div className={style.row3}>
          <Cell value={squares[6]} OnClickingTheCell={() => Click(6)} />
          <Cell value={squares[7]} OnClickingTheCell={() => Click(7)} />
          <Cell value={squares[8]} OnClickingTheCell={() => Click(8)} />
        </div>
      </div>
    </>
  );
}

function Game() {
  const [playing, setPlaying] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const EnableButtons = () => {
    const buttons = document.querySelectorAll("#btn");
    buttons.forEach((button) => {
      button.classList.remove(style.won);
    });
  };
  
  function JumpToMove(move) {
    EnableButtons();
    setCurrentMove(move);
    setPlaying(move % 2 === 0);
  }

  const currentCells = history[currentMove];

  const OnBoardPlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setPlaying(!playing);
  };

  const moves = history.map((hist, move) => {
    let description;
    if (move > 0) {
      description = "Jump to Move: " + move;
    } else {
      description = "Jump to Game Start";
    }
    return (
      <Button
        value={description}
        HandleClick={() => JumpToMove(move)}
        key={hist}
      />
    );
  });

  return (
    <>
      <div className={style.game_board}>
        <Board playing={playing} squares={currentCells} onPlay={OnBoardPlay} />
      </div>
      <div className={style.game_info}>{moves}</div>
    </>
  );
}

export default Game;

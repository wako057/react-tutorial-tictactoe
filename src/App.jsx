import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combination";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function derivedActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;
  let winner;

  for (const turn of gameTurns) {
      const { square, player} = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS ){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      console.log(`firstSquareSymbol: ${firstSquareSymbol} - SecondSquareSymbol: ${secondSquareSymbol} - ThirdSquareSymbol: ${thirdSquareSymbol}`);
      if (
          firstSquareSymbol &&
          firstSquareSymbol === secondSquareSymbol &&
          firstSquareSymbol === thirdSquareSymbol
      ) {
          winner = firstSquareSymbol;
      }
  }

  function handleSelectSquare(rowIndex, colIndex) {
      setGameTurns(prevTurn => {
        const currentPlayer = derivedActivePlayer(gameTurns);

          const updatedTurns = [
              { square: { row: rowIndex, col: colIndex}, player: currentPlayer },
              ...prevTurn
          ];

          return updatedTurns;
      });

  }

  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player
                  initialName="Player 1"
                  symbol="X"
                  isActive={activePlayer === 'X'}
              />
              <Player
                  initialName="Player 2"
                  symbol="O"
                  isActive={activePlayer === 'O'}
              />
          </ol>
            {winner && <p>You won {winner} !</p>}
            <GameBoard
                onSelectSquare={handleSelectSquare}
                board={gameBoard}
            />
        </div>
        <Log turns={gameTurns}/>
      </main>
  )
}

export default App

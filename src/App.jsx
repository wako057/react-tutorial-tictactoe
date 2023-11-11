import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "../winning-combination";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
};

function derivedActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function derivedWiner(gameBoard, players) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        console.log(`firstSquareSymbol: ${firstSquareSymbol} - SecondSquareSymbol: ${secondSquareSymbol} - ThirdSquareSymbol: ${thirdSquareSymbol}`);
        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function derivedGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = derivedActivePlayer(gameTurns);
    const gameBoard = derivedGameBoard(gameTurns);
    const winner = derivedWiner(gameBoard, players);
    const hasDrawn = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns(prevTurn => {
            const currentPlayer = derivedActivePlayer(gameTurns);

            const updatedTurns = [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurn
            ];

            return updatedTurns;
        });
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    function handleRestart() {
        setGameTurns([]);
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangedName={handlePlayerNameChange}
                    />
                    <Player
                        initialName="Player 2"
                        symbol="O"
                        isActive={PLAYERS.O}
                        onChangedName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDrawn) && <GameOver winner={winner} onRestart={handleRestart}/>}
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

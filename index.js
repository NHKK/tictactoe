const prompt = require('prompt-sync')();
const playerOne = 'X';
const playerTwo = 'O';
let isGameOver = false;
let currentTurn = 0;
let board = [
  "", "", "",
  "", "", "",
  "", "", "",
]

function gameOverCalculate(){

}

function checkIsWinner(currentTurn, movePlayed){
  const playerSymbol = getPlayerSymbol(currentTurn);
  updateBoard(playerSymbol, movePlayed);
  const winningStrategies = getWinningStrategies(movePlayed);
  const isWinner = verifyWinningStrategies(winningStrategies, playerSymbol);
  return {player: playerSymbol, winner: isWinner}
}

function getPlayerSymbol(currentTurn){
  const isPlayerOne = currentTurn % 2 !== 1;
  return isPlayerOne ? playerOne : playerTwo;
}

function updateBoard(playerSymbol, movePlayed){
  board[movePlayed] = playerSymbol;
}

function getWinningStrategies(movePlayed){
  const WINNING_CONDITIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8],
  ];
  return WINNING_CONDITIONS.filter(condition => condition.includes(Number(movePlayed)));
}

function verifyWinningStrategies(strategies, playerSymbol){
  let isWinner = false;
  strategies.forEach((strategy) => {
    if(isWinner) return;
    console.log(playerSymbol, " player - winning strat ", strategy);
    const result = strategy.every((s) => board[s] === playerSymbol)
    isWinner = result;
  })
  return isWinner;
}
const name = prompt('number');
console.log(`Hey there ${name}`);
console.log('hasWinner ', checkIsWinner(currentTurn, name))

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

function hasWinner(currentTurn, movePlayed){
  const isPlayerOne = currentTurn % 2 !== 1;
  updateBoard(isPlayerOne, movePlayed);
  getWinningStrategies(movePlayed);
}

function updateBoard(isPlayerOne, movePlayed){
  const updateSymbol = isPlayerOne ? playerOne : playerTwo;
  board[movePlayed] = updateSymbol;
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
const name = prompt('number');
console.log(`Hey there ${name}`);
console.log('hasWinner ', hasWinner(currentTurn, name))

const prompt = require('prompt-sync')();
const playerOne = 'X';
const playerTwo = 'O';
let isGameOver = false;
let currentTurn = 0;
let board = makeNewBoard(); 

function makeNewBoard(){
  return Array.from('-'.repeat(9));
}

function printBoard(){
  console.log("\n=================")
  for(let i=0; i<board.length; ){
    console.log(`${board[i]}:${i}, ${board[i+1]}:${i+1}, ${board[i+2]}:${i+2}`);
    i += 3;
  }
  console.log("=================")
}

function gameOverCalculate(playerMove){
  const potentialWinner = checkIsWinner(currentTurn, playerMove);
  if(potentialWinner.winner){
    printBoard();
    console.log(`Winner is ${potentialWinner.player}`)
  }
  return potentialWinner.winner || currentTurn === 8;
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
    const result = strategy.every((s) => board[s] === playerSymbol)
    isWinner = result;
  })
  return isWinner;
}

function verifyMove(playerMove){
  const potentialMove = board[playerMove];
  return potentialMove === "-";
}

while(!isGameOver){
  printBoard();
  const playerSymbol = getPlayerSymbol(currentTurn);
  let playerMove =  prompt(`Player ${playerSymbol} enter a move (0-8) - `);
  let isMoveValid = verifyMove(playerMove);
  while(!isMoveValid){
    playerMove =  prompt(`Invalid move please enter valid move Player ${playerSymbol} - `);
    isMoveValid = verifyMove(playerMove);
  }
  isGameOver = gameOverCalculate(playerMove);
  currentTurn += 1;
}

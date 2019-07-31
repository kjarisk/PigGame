/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


// THe PIG GAmE

const startGame = () => {

  let scores = [0,0];
  let roundScore = 0;
  let activePlayer = 0;
  let gameWon = false;

  const initVariables = () => {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameWon = false;
    document.querySelector(".dice").style.display = "none";
    document.querySelector("#score-0").textContent = scores[0];
    document.querySelector("#score-1").textContent = scores[1];
  }

  const finish = () => {
    alert("We got a Champ");
    rollButton.removeEventListener("click", rollDice);
    holdButton.removeEventListener("click", holdNumber); 
  }

  const rollDice = () => {
    if (gameWon === true) {
      finish();
      return;
    }
    const dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".dice").src = "dice-"+dice+".png";
    if (dice === 1) {
      alert("You are Screwed, eat a banana!!");
      changePlayer();
      roundScore = 0;
      return;
    } 
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    document.querySelector(".dice").style.display = "block";
  }

  const changePlayer = () => {
    document.querySelector("#current-" + activePlayer).textContent = 0;
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active")
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(".player-"+activePlayer+"-panel").className += " active";
  }

  const holdNumber = () => {
    scores[activePlayer] = scores[activePlayer] +roundScore;
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] === 24 || scores[activePlayer] === 25 || scores[activePlayer] === 26 || scores[activePlayer] === 27) {
      alert("Your score is resetted!!!");
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
      changePlayer();
      roundScore = 0
      return;
    }
    if (scores[activePlayer] >= 100) {
      gameWon = true;
      finish();
      return;
    }
    roundScore = 0;
    document.querySelector(".dice").style.display = "none";
    changePlayer();
  }

  initVariables();

  const rollButton = document.querySelector(".btn-roll");
  const holdButton = document.querySelector(".btn-hold");
  rollButton.addEventListener("click", rollDice);
  holdButton.addEventListener("click", holdNumber); 
}

startGame();

const newGame = document.querySelector(".btn-new");
newGame.addEventListener("click", startGame); 

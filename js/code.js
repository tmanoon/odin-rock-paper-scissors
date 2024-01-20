function getComputerChoice() {
    const options = ['Rock', 'Paper', 'Scissors']
    var choice = options[Math.floor((Math.random() * 3))]
    return choice
}

var playerScore = 0
var computerScore = 0

function score(computer, player, equality = false) {

    var equal = equality
    playerScore += player
    computerScore += computer

    var p = document.createElement('p')
    var winnerDiv = document.querySelector('#winner')
    if (equal) {
        p.textContent = 'Nobody won this time.'
    }
    

    p.textContent = `The player's score is: ${playerScore}, and the computer's score is: ${computerScore}`
    if (playerScore === 5) {
        p.textContent = 'The player is the winner!'
    } else if (computerScore === 5) {
        p.textContent = 'The computer is the winner!'
    }
    
    winnerDiv.appendChild(p)
}

function playRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        score(0, 0, true)
        return `Both you and the computer selected ${computerSelection}. This round does not count, and another one is added for the competition.`
    } else if ((playerSelection === 'Rock' && computerSelection === 'Scissors') || (playerSelection === 'Paper' && computerSelection === 'Rock') || (playerSelection === 'Scissors' && computerSelection === 'Paper')) {
        score(0, 1)
        return `Congratulations! You won! ${playerSelection} beats ${computerSelection} !`
    } else {
        score(1, 0)
        return `The computer won! ${computerSelection} beats ${playerSelection} !`
    }
}

function handleButtonClick(buttonId) {
    var playerSelection = buttonId.charAt(0).toUpperCase() + buttonId.slice(1);
    var computerChoice = getComputerChoice();
    var div = document.querySelector('.results')
    div.textContent = playRound(playerSelection, computerChoice);
}

var rockButton = document.querySelector('#rock');
var paperButton = document.querySelector('#paper');
var scissorsButton = document.querySelector('#scissors');

rockButton.addEventListener('click', function () {
    handleButtonClick('rock');
});

paperButton.addEventListener('click', function () {
    handleButtonClick('paper');
});

scissorsButton.addEventListener('click', function () {
    handleButtonClick('scissors');
});





/* function game() {

    for (var i = 0; i < 5; i++) {
        var playerSelection = prompt('Please enter your selection: Rock, Scissors or Paper.')
        playerSelection = (playerSelection.charAt(0).toUpperCase()) + playerSelection.slice(1)

        var computerChoice = getComputerChoice()
        console.log(playRound(playerSelection, computerChoice))
        if (equality) {
            i--
            equality = false
        }
    } */

/* game() */ 
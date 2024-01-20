function getComputerChoice() {
    const options = ['Rock', 'Paper', 'Scissors']
    var choice = options[Math.floor((Math.random() * 3))]
    return choice
}

    var playerScore = 0
    var computerScore = 0
    var equality = false

function playRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        equality = true
        return `Both you and the computer selected ${computerSelection}. This round does not count, and another one is added for the competition.`
    } else if ((playerSelection === 'Rock' && computerSelection === 'Scissors') || (playerSelection === 'Paper' && computerSelection === 'Rock') || (playerSelection === 'Scissors' && computerSelection === 'Paper')) {
        playerScore++
        return `Congratulations! You won! ${playerSelection} beats ${computerSelection} !`
    } else {
        computerScore++
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



var p = document.createElement('p')
p.textContent = `The player score now is ${playerScore}, and the computer score is ${computerScore}`
if (playerScore === 5) {
    p.textContent += `and the winner is the Player!`
} else if (computerScore === 5) {
    p.textContent += `and the winner is the computer!`
}

var bod = document.querySelector('#bod')
bod.appendChild(p)




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
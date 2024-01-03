function getComputerChoice() {
    const options = ['Rock', 'Paper', 'Scissors']
    var choice = options[Math.floor((Math.random() * 3))]
    return choice
}

function playRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        equality = true
        return `Both you and the computer selected ${computerSelection}. This round does not count, and another one is added for the competition.`
    } else if ((playerSelection === 'Rock' && computerSelection === 'Scissors') || (playerSelection === 'Paper' && computerSelection === 'Rock') || (playerSelection === 'Scissors' && computerSelection === 'Paper') ) {
        playerScore++
        return `Congratulations! You won! ${playerSelection} beats ${computerSelection} !`
    } else {
        computerScore++
        return `The computer won! ${computerSelection} beats ${playerSelection} !`
    }
}

var playerScore = 0
var computerScore = 0
var equality = false

function game() {

    for (var i = 0; i < 5; i++) {
        var playerSelection = prompt('Please enter your selection: Rock, Scissors or Paper.')
        playerSelection = (playerSelection.charAt(0).toUpperCase()) + playerSelection.slice(1)

        var computerChoice = getComputerChoice()
        console.log(playRound(playerSelection, computerChoice))
        if (equality) {
            i--
            equality = false
        }
    }

    if (computerScore > playerScore) {
        console.log('The computer scored more points than you. You lose!')
    } else {
        console.log('You scored more points than the computer. You won!')
    }
}

game()
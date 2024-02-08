'use strict'

const FLAG = '🏴‍☠️'
const MINE = '💣'
const EXPLODE = '💥'
const EMPTY = ''
var lives = 3
var safeClicks = 3
var gSecondsInterval
var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2
}

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    if (gSecondsInterval) clearInterval(gSecondsInterval)
    updateSpanSafeClicks()
    showHints()
    updateLives(lives)
    createBoard()
    renderBoard()
}

function createBoard() {
    for (let i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = []
        for (let j = 0; j < gLevel.SIZE; j++) {
            const currCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                isHint: false,
                wasHinted: false
            }
            gBoard[i][j] = currCell
        }
    }
}

function renderBoard() {
    const board = document.querySelector('table')
    var strHTML = ''
    strHTML += '<tbody>'
    for (let i = 0; i < gLevel.SIZE; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < gLevel.SIZE; j++) {
            const className = `cell-${i}-${j}`
            strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" onmouseup="returnToRegularExpression()" 
            onmousedown="onCellClicked(this, event, ${i}, ${j})">${EMPTY}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += '</tbody>'
    board.innerHTML = strHTML
}

function onCellClicked(elCell, ev, i, j) {
    const click = ev.button
    gRandyBtn.src = './icons/anxious-randy.png'

    if (click === 0) {
        if (checkIfFirstClick()) {
            const numOfMines = gLevel.MINES
            onLeftClick(elCell, i, j)
            gGame.shownCount--
            randomMines(numOfMines, i, j)
            setMinesNegsCount(gBoard)
            onLeftClick(elCell, i, j)
            startCountingSeconds()
            if (gBoard[i][j].isHint) revealCellsAndNegs(i, j)
            return
        }
        if (gBoard[i][j].isHint) revealCellsAndNegs(i, j)
        onLeftClick(elCell, i, j)
    }
    if (click === 2) {
        onCellMarked(elCell)
    }
    return
}

function onLeftClick(elCell, i, j) {
    gGame.shownCount++
    if (gBoard[i][j].isMine) {
        showMine(elCell, i, j)
    }
    else {
        gBoard[i][j].isShown = true
        elCell.innerText = gBoard[i][j].minesAroundCount
    }
}

function showMine(cell, i, j) {
    cell.innerText = MINE
    lives--
    checkIfEnoughLives()
    gRandyBtn.src = './icons/sad-randy.png'
    gGame.shownCount--
    updateLives(lives)
    gBoard[i][j].isShown = true
    setTimeout(() => {
        cell.innerText = EXPLODE
    }, 500)
}

function setMinesNegsCount(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            if (currCell.isMine) continue
            currCell.minesAroundCount = countMinesAroundCell(i, j)
        }
    }
}

function countMinesAroundCell(rowIdx, colIdx) {
    var counter = 0
    for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard[0].length) continue
        for (let j = colIdx + 1; j >= colIdx - 1; j--) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (gBoard[i][j].isMine) counter++
        }
    }
    return counter
}

function checkGameOver() {
    const winningTotal = (gLevel.SIZE ** 2) - (gLevel.MINES)
    const cellsClickedAndMarked = gGame.shownCount + gGame.markedCount
    if (gGame.secsPassed < 90 && cellsClickedAndMarked === winningTotal) {
        console.log(`You did it! you won!`)
        clearInterval(gSecondsInterval)
    }
    if (gGame.secsPassed >= 90 && cellsClickedAndMarked !== winningTotal) {
        console.log(`Time has run out and you haven't found all the cells yet. You lost.`)
        gRandyBtn.src = '../icons/sad-randy.png'
        clearInterval(gSecondsInterval)
    }
}

function expandShown(board, elCell, i, j) { //try afterwards
}

function randomMines(numOfMines, i, j) {
    while (numOfMines > 0) {
        const iIdxOfRandCell = getRandomIntInclusive()
        const jIdxOfRandCell = getRandomIntInclusive()
        if (gBoard[iIdxOfRandCell][jIdxOfRandCell].isMine === true) continue
        if (iIdxOfRandCell === i && jIdxOfRandCell === j) continue
        gBoard[iIdxOfRandCell][jIdxOfRandCell].isMine = true
        numOfMines--
    }
}

function onCellMarked(elCell) {
    const iIdxOfCell = elCell.dataset.i
    const jIdxOfCell = elCell.dataset.j

    if (gBoard[iIdxOfCell][jIdxOfCell].isMarked === false) {
        elCell.innerText = FLAG
        gGame.markedCount++
        gBoard[iIdxOfCell][jIdxOfCell].isMarked = true
        return
    }
    if (gBoard[iIdxOfCell][jIdxOfCell].isMarked === true) {
        elCell.innerText = EMPTY
        gGame.markedCount--
        gBoard[iIdxOfCell][jIdxOfCell].isMarked = false
    }
}

function checkIfFirstClick() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell.wasHinted || currCell.isShown) return false
        }
    }
    return true
}

function setLevelSize(numForMatrix, numOfMines) {
    gElTimerSpan.innerText = 0
    gGame.secsPassed = 0
    gLevel.SIZE = numForMatrix
    gLevel.MINES = numOfMines
    gBoard = []
    onInit()
}

function updateLives(numOfLives) {
    const spanOfLives = document.querySelector(".lives span")
    spanOfLives.innerText = numOfLives
}

function checkIfEnoughLives() {
    const isHint = checkHintMode()
    if (lives === 0 && !isHint) {
        clearInterval(gSecondsInterval)
        gRandyBtn.src = './icons/sad-randy.png'
        console.log('No more lives. You Lost!')
        onInit()
    }
}

function checkHintMode() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isHint) return true
        }
    }
    return false
}

function turnOnHintMode(img) {
    img.style.backgroundColor = 'beige'
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].isHint = true
        }
    }
}

function revealCellsAndNegs(rowIdx, colIdx) {
    gBoard[rowIdx][colIdx].wasHinted = true
    const originalLives = lives
    for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (let j = colIdx + 1; j >= colIdx - 1; j--) {
            if (j < 0 || j >= gBoard[0].length) continue
            const currElCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            onLeftClick(currElCell, i, j)
        }
    }
    setTimeout(() => {
        unrevealCellAndNegs(rowIdx, colIdx, originalLives)
        turnOffAndRemoveHint()
        turnOffHintMode()
    }, 1000)

}

function unrevealCellAndNegs(rowIdx, colIdx, originalLives) {
    for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (let j = colIdx + 1; j >= colIdx - 1; j--) {
            if (j < 0 || j >= gBoard[0].length) continue
            const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.innerText = EMPTY
            lives = originalLives
            updateLives(lives)
            gBoard[i][j].isShown = false
            gGame.shownCount--
        }
    }
    gRandyBtn.src = './icons/regular-randy.png'
}

function turnOffHintMode() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isHint === true) gBoard[i][j].isHint = false
        }
    }
}

function useSafeClick() {
    if (safeClicks === 0) return
    for (let i = 0; i < gLevel.SIZE; i++) {
        for (let j = 0; j < gLevel.SIZE; j++) {
            const iIdxOfRandSafeCell = getRandomIntInclusive()
            const jIdxOfRandSafeCell = getRandomIntInclusive()
            if (!gBoard[iIdxOfRandSafeCell][jIdxOfRandSafeCell].isMine && !gBoard[iIdxOfRandSafeCell][jIdxOfRandSafeCell].isShown) {
                handleChosenCell(iIdxOfRandSafeCell, jIdxOfRandSafeCell)
                return
            }
        }
    }
}

function handleChosenCell(i, j) {
    markCell(i, j)
    setTimeout(() => {
        const elCell = document.querySelector(`.cell-${i}-${j}`)
        elCell.style.boxShadow = 'none'
    }, 1500)
    safeClicks--
    updateSpanSafeClicks()
}

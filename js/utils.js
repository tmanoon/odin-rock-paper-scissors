const gRandyBtn = document.querySelector('#img-button')
const gElTimerSpan = document.querySelector('.timer span')
const elSpanSafeClick = document.querySelector('.safe-click')

function getRandomIntInclusive(min = 0, max = gBoard.length - 1) {
    return Math.floor(Math.random() * (max - min) + min)
}

function renderCell(location, value) {
    const cell = document.querySelector(`.cell ${location.i}-${location.j}`)
    cell.innerHTML = value
}

function disableMenu(ev) {
    ev.preventDefault()
}

function returnToRegularExpression() {
    const img = document.querySelector('#img-button')
    img.src = './icons/regular-randy.png'
}

function timeCounter() {
 
    gElTimerSpan.innerText = gGame.secsPassed
}

function showHints() {
    const hintsImages = document.querySelectorAll('.hintImg')
    for (let i = 0; i < hintsImages.length; i++) {
        if (hintsImages[i].style.display === 'none') hintsImages[i].style.display = 'inline-block'
    }
}

function turnOffAndRemoveHint() {
        const hintsImages = document.querySelectorAll('.hintImg')
        for (let i = 0; i < hintsImages.length; i++) {
            const currImage = hintsImages[i]
            if (currImage.style.backgroundColor === 'beige') {
                currImage.style.backgroundColor = 'transparent'
                currImage.style.display = 'none'
            }
        }
}

function darkMode() {
    const elTds = document.querySelectorAll('td')
    const elBtns = document.querySelectorAll('button')
    for(let i = 0; i < elTds.length; i++) {
        if(elTds[i].classList.contains('bright-mode')) elTds[i].classList.remove('bright-mode')
        elTds[i].classList.add('dark-mode')
       
    }
    
    for(let i = 0; i < elBtns.length; i++) {
        if(elBtns[i].classList.contains('btn')) continue
         elBtns[i].classList.add('dark-mode')
    }
}

function brightMode() {
    const elTds = document.querySelectorAll('td')
    const elBtns = document.querySelectorAll('button')
    for(let i = 0; i < elTds.length; i++) {
        if(elTds[i].classList.contains('dark-mode')) elTds[i].classList.remove('dark-mode')
       
    }

    for(let i = 0; i < elBtns.length; i++) {
        if(elBtns[i].classList.contains('btn')) continue
        else if(elBtns[i].classList.contains('dark-mode')) elBtns[i].classList.remove('dark-mode')
        elBtns[i].classList.add('bright-mode')
    }
}

function markCell(i, j) {
    const elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.style.boxShadow = 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
}

function updateSpanSafeClicks() {
    elSpanSafeClick.innerText = safeClicks
}

function startCountingSeconds() {
    gSecondsInterval = setInterval(function () {
        timeCounter()
        gGame.secsPassed++
        checkGameOver()
    }, 1000)
}

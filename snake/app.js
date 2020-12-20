document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.snakeGrid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')
  const snakeUp = document.getElementById('snakeUp')
  const snakeLeft = document.getElementById('snakeLeft')
  const snakeDown = document.getElementById('snakeDown')
  const snakeRight = document.getElementById('snakeRight')

  const width = 15
  let currentIndex = 0
  let appleIndex = 0
  let currentSnake = [2, 1, 0]
  let direction = 1
  let score = 0
  let speed = 0.94
  let intervalTime = 0
  let interval = 0

  // to start and restart the game

  function startGame() {
    // On efface le snake qui était là avant
    currentSnake.forEach((index) => squares[index].classList.remove('snake'))
    // On efface la pomme aussi
    squares[appleIndex].classList.remove('apple')
    // ?
    clearInterval(interval)
    // C'est le départ donc score à 0
    score = 1

    randomApple()

    // On avance vers la droite d'une case à la fois
    direction = 1
    // On affiche le score
    scoreDisplay.innerText = score
    // On fixe l'interval de rafraichissement
    intervalTime = 900
    // On affiche le snake, au départ tête en 2, corps en 1
    // et queue en 0, le serpent fait donc trois cases en haut à gauche
    currentSnake = [2, 1, 0]
    // ?
    currentIndex = 0
    // On affiche le snake du départ
    currentSnake.forEach((index) => squares[index].classList.add('snake'))
    //
    interval = setInterval(moveOutcomes, intervalTime)
  }

  // function that deals with ALL the move outcomes of the snake
  function moveOutcomes() {
    if (
      // tape le mur du bas
      (currentSnake[0] + width >= width * width && direction === width) ||
      // tape le mur de droite
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      // tape le mur de gauche
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width < 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
      clearInterval(interval)

      endGame()
    }

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)

      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }

    squares[currentSnake[0]].classList.add('snake')
  }

  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
  }

  // Assign function to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if (e.keyCode === 39) {
      direction = 1
    } else if (e.keyCode === 38) {
      direction = -width
    } else if (e.keyCode === 37) {
      direction = -1
    } else if (e.keyCode === 40) {
      direction = width
    }
  }

  function snakeGoUp() {
    direction = -width
  }
  function snakeGoLeft() {
    direction = -1
  }
  function snakeGoDown() {
    direction = width
  }
  function snakeGoRight() {
    direction = 1
  }

  function endGame() {
    const endGameBox = document.querySelector('.endGameBox')

    // Ajout d'un bouton reload
    const reloadButton = document.createElement('button')
    reloadButton.innerHTML = 'Recommencer'
    endGameBox.appendChild(reloadButton)
    reloadButton.addEventListener('click', () => {
      window.location.reload(true)
    })

    // Créer le boutton enregistrer
    const registerButton = document.createElement('button')
    registerButton.innerHTML = 'Enregistrer ma perf'

    // Lier le lien vers php
    registerButton.addEventListener('click', () => {
      // Récupérer le pseudo et commentaire
      const pseudo = document.getElementById('pseudo').value
      const comment = document.getElementById('comment').value

      document.location.href =
        '?pseudo=' + pseudo + '&score=' + score + '&comment=' + comment
    })

    endGameBox.appendChild(registerButton)
    endGameBox.style.top = '100px'
  }

  document.addEventListener('keyup', control)
  snakeUp.addEventListener('click', snakeGoUp)
  snakeLeft.addEventListener('click', snakeGoLeft)
  snakeDown.addEventListener('click', snakeGoDown)
  snakeRight.addEventListener('click', snakeGoRight)
  startBtn.addEventListener('click', startGame)
})

document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.fb-bird')
  const gameDisplay = document.querySelector('.fb-gameContainer')
  const ground = document.querySelector('.fb-ground')
  const sky = document.querySelector('.fb-sky')
  const scoreValue = document.getElementById('fb-scoreValue')

  let birdLeft = 125
  let birdBottom = 300
  let gravity = 2
  let isGameOver = false
  let gap = 500
  let freqObstacle = 3000
  let score = -1
  let timerBird = 0
  let timerJumpWithButton = 0

  function startGame() {
    let fbStart = document.createElement('button')
    fbStart.classList.add('fb-start')
    fbStart.innerText = "Lache l'oiseau !"
    ground.appendChild(fbStart)

    fbStart.addEventListener('click', () => {
      ground.removeChild(fbStart)

      let fbJump = document.createElement('button')
      fbJump.classList.add('fb-start')
      fbJump.innerText = 'FLY !!'
      ground.appendChild(fbJump)

      generateObstacle()
      timerBird = setInterval(moveBird, 20)

      // Prise en compte des commandes pour clavier / souris / mobile
      document.addEventListener('keydown', control)

      fbJump.addEventListener('click', jump)

      fbJump.addEventListener('touchstart', (e) => {
        e.preventDefault()
        timerJumpWithButton = setInterval(() => {
          if (!isGameOver && birdBottom < 460) birdBottom += 12
          bird.style.bottom = birdBottom + 'px'
        }, 40)
      })

      fbJump.addEventListener('touchend', (e) => {
        e.preventDefault()
        if (timerJumpWithButton) clearInterval(timerJumpWithButton)
      })
    })
  }

  function moveBird() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
  }

  function control(e) {
    // On saute si appui sur la touche entrée
    if (e.keyCode === 13) {
      jump()
    }
  }

  function jump() {
    if (!isGameOver && birdBottom < 460) birdBottom += 35
    bird.style.bottom = birdBottom + 'px'
    console.log(birdBottom)
  }

  function generateObstacle() {
    let obstacleLeft = 375
    let randomHeight = Math.random() * 120 - 170
    let obstacleBottom = randomHeight
    score++
    if (gap > 380) {
      gap -= 3
    }
    freqObstacle -= 20

    scoreValue.innerText = score
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')

    if (!isGameOver) {
      obstacle.classList.add('fb-obstacle')
      topObstacle.classList.add('fb-topObstacle')
      gameDisplay.appendChild(obstacle)
      gameDisplay.appendChild(topObstacle)
      obstacle.style.left = obstacleLeft + 'px'
      obstacle.style.bottom = obstacleBottom + 'px'
      topObstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.bottom = obstacleBottom + gap + 'px'
      timerObstacle = setInterval(moveObstacle, 20)
    }

    function moveObstacle() {
      obstacleLeft -= 2
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'

      if (obstacleLeft === -60) {
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
      }

      if (
        (!isGameOver &&
          birdBottom < randomHeight - 120 + 298 &&
          obstacleLeft > 68 &&
          obstacleLeft < 177) ||
        (!isGameOver &&
          birdBottom > randomHeight - 120 + gap - 42 &&
          obstacleLeft > 68 &&
          obstacleLeft < 177) ||
        (!isGameOver && birdBottom === 0)
      ) {
        isGameOver = true
        clearInterval(timerObstacle)
        clearInterval(timerBird)
        clearTimeout(timerGenerateObstacle)
        console.log('game Over')
        document.removeEventListener('keydown', control)

        endGame()
      }
    }

    moveObstacle()
    timerGenerateObstacle = setTimeout(generateObstacle, freqObstacle)
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

    // On ajoute les boutons et on affiche le tout
    endGameBox.appendChild(registerButton)
    endGameBox.classList.add('show')
  }

  timerGenerateObstacle = startGame()
})

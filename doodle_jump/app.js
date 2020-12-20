document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.doodleGrid')
  const doodler = document.createElement('div')
  const goLeft = document.getElementById('left')
  const goRight = document.getElementById('right')
  const goStraight = document.getElementById('straight')
  const startButton = document.getElementById('startButton')
  let doodlerLeftSpace = 50
  let startPoint = 150
  let doodlerBottomSpace = startPoint
  let platformCount = 5
  let isGameOver = false
  let isGameOn = false
  let platforms = []
  let upTimerId
  let downTimerId
  let isJumping = true
  let isGoingLeft = false
  let isGoingRight = false
  let leftTimerId = false
  let rightTimerId = false
  let score = 0
  let width = 80

  function createDoodler() {
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodlerLeftSpace = platforms[0].left
    doodler.style.left = doodlerLeftSpace + 'px'
    doodler.style.bottom = doodlerBottomSpace + 'px'
  }

  class Platform {
    constructor(newPlatformBottom, width) {
      this.bottom = newPlatformBottom
      this.left = Math.random() * 315
      this.width = width
      this.visual = document.createElement('div')

      const visual = this.visual
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      visual.style.height = '15px'
      visual.style.width = this.width + 'px'
      visual.style.position = 'absolute'
      visual.classList.add('platform')

      grid.appendChild(visual)
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount
      let newPlatformBottom = 100 + i * platformGap
      let newPlatform = new Platform(newPlatformBottom, width)
      platforms.push(newPlatform)
      console.log(platforms)
    }
  }

  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4
        let visual = platform.visual
        visual.style.bottom = platform.bottom + 'px'

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual
          firstPlatform.classList.remove('platform')
          platforms.shift()
          score++

          width = 80 - 0.5 * score

          let newPlatform = new Platform(600, width)
          platforms.push(newPlatform)
        }
      })
    }
  }

  function jump() {
    clearInterval(downTimerId)
    isJumping = true
    upTimerId = setInterval(function () {
      doodlerBottomSpace += 21
      doodler.style.bottom = doodlerBottomSpace + 'px'

      if (doodlerBottomSpace > startPoint + 210) {
        fall()
      }
    }, 30)
  }

  function fall() {
    clearInterval(upTimerId)
    isJumping = false

    downTimerId = setInterval(function () {
      doodlerBottomSpace -= 6
      doodler.style.bottom = doodlerBottomSpace + 'px'

      if (doodlerBottomSpace <= 0) {
        gameOver()
      }

      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottom &&
          doodlerBottomSpace <= platform.bottom + 15 &&
          doodlerLeftSpace + 60 >= platform.left &&
          doodlerLeftSpace <= platform.left + platform.width &&
          !isJumping
        ) {
          console.log('landed')
          startPoint = doodlerBottomSpace
          jump()
        }
      })
    }, 30)
  }

  function gameOver() {
    console.log('game over')
    isGameOver = true
    isGameOn = false

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild)
    }
    grid.innerHTML = score
    clearInterval(downTimerId)
    clearInterval(upTimerId)
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)

    endGame()
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

  function control(e) {
    if (e.key === 'ArrowLeft') {
      moveLeft()
    } else if (e.key === 'ArrowRight') {
      moveRight()
    } else if (e.key === 'ArrowUp') {
      moveStraight()
    }
  }

  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId)
      isGoingRight = false
    }
    isGoingLeft = true
    clearInterval(leftTimerId)
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5
        doodler.style.left = doodlerLeftSpace + 'px'
      } else {
        moveRight()
      }
      doodlerLeftSpace -= 5
      doodler.style.left = doodlerLeftSpace + 'px'
    }, 30)
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId)
      isGoingLeft = false
    }
    isGoingRight = true
    clearInterval(rightTimerId)
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 5
        doodler.style.left = doodlerLeftSpace + 'px'
      } else {
        moveLeft()
      }
      doodlerLeftSpace += 5
      doodler.style.left = doodlerLeftSpace + 'px'
    }, 30)
  }

  function moveStraight() {
    isGoingRight = false
    isGoingLeft = false
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
  }

  function start() {
    if (!isGameOver && !isGameOn) {
      isGameOn = true
      grid.removeChild(startButton)
      createPlatforms(score)
      createDoodler()
      setInterval(movePlatforms, 30)
      jump()

      goLeft.addEventListener('click', moveLeft)
      goRight.addEventListener('click', moveRight)
      goStraight.addEventListener('click', moveStraight)

      document.addEventListener('keyup', control)
    }
  }

  startButton.addEventListener('click', start)
})

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var squares = document.querySelectorAll(".snakeGrid div");
  var scoreDisplay = document.querySelector("span");
  var startBtn = document.querySelector(".start");
  var snakeUp = document.getElementById("snakeUp");
  var snakeLeft = document.getElementById("snakeLeft");
  var snakeDown = document.getElementById("snakeDown");
  var snakeRight = document.getElementById("snakeRight");
  var width = 15;
  var currentIndex = 0;
  var appleIndex = 0;
  var currentSnake = [2, 1, 0];
  var direction = 1;
  var score = 0;
  var speed = 0.94;
  var intervalTime = 0;
  var interval = 0; // to start and restart the game

  function startGame() {
    // On efface le snake qui était là avant
    currentSnake.forEach(function (index) {
      return squares[index].classList.remove("snake");
    }); // On efface la pomme aussi

    squares[appleIndex].classList.remove("apple"); // ?

    clearInterval(interval); // C'est le départ donc score à 0

    score = 1;
    randomApple(); // On avance vers la droite d'une case à la fois

    direction = 1; // On affiche le score

    scoreDisplay.innerText = score; // On fixe l'interval de rafraichissement

    intervalTime = 900; // On affiche le snake, au départ tête en 2, corps en 1
    // et queue en 0, le serpent fait donc trois cases en haut à gauche

    currentSnake = [2, 1, 0]; // ?

    currentIndex = 0; // On affiche le snake du départ

    currentSnake.forEach(function (index) {
      return squares[index].classList.add("snake");
    }); //

    interval = setInterval(moveOutcomes, intervalTime);
  } // function that deals with ALL the move outcomes of the snake


  function moveOutcomes() {
    if ( // tape le mur du bas
    currentSnake[0] + width >= width * width && direction === width || // tape le mur de droite
    currentSnake[0] % width === width - 1 && direction === 1 || // tape le mur de gauche
    currentSnake[0] % width === 0 && direction === -1 || currentSnake[0] - width < 0 && direction === -width || squares[currentSnake[0] + direction].classList.contains("snake")) {
      clearInterval(interval);
      endGame();
    }

    var tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }

    squares[currentSnake[0]].classList.add("snake");
  }

  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));

    squares[appleIndex].classList.add("apple");
  } // Assign function to keycodes


  function control(e) {
    e.preventDefault();
    squares[currentIndex].classList.remove("snake");

    if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = width;
    }
  }

  function snakeGoUp() {
    direction = -width;
  }

  function snakeGoLeft() {
    direction = -1;
  }

  function snakeGoDown() {
    direction = width;
  }

  function snakeGoRight() {
    direction = 1;
  }

  function endGame() {
    var endGameBox = document.querySelector(".endGameBox"); // Ajout d'un bouton reload

    var reloadButton = document.createElement("button");
    reloadButton.innerHTML = "Recommencer";
    endGameBox.appendChild(reloadButton);
    reloadButton.addEventListener("click", function () {
      window.location.reload(true);
    }); // Créer le boutton enregistrer

    var registerButton = document.createElement("button");
    registerButton.innerHTML = "Enregistrer ma perf"; // Lier le lien vers php

    registerButton.addEventListener("click", function () {
      // Récupérer le pseudo et commentaire
      var pseudo = document.getElementById("pseudo").value;
      var comment = document.getElementById("comment").value;
      document.location.href = "?pseudo=" + pseudo + "&score=" + score + "&comment=" + comment;
    });
    endGameBox.appendChild(registerButton);
    endGameBox.style.top = "100px";
  }

  document.addEventListener("keyup", control);
  snakeUp.addEventListener("click", snakeGoUp);
  snakeLeft.addEventListener("click", snakeGoLeft);
  snakeDown.addEventListener("click", snakeGoDown);
  snakeRight.addEventListener("click", snakeGoRight);
  startBtn.addEventListener("click", startGame);
});
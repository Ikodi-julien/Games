document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".deuxMilles__grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const width = 4;

  let squares = [];
  let score = 0;

  // Create a playing board
  const createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateNumber();
    generateNumber();
  };

  // generate a number randomly
  const generateNumber = () => {
    let randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerText == 0) {
      squares[randomNumber].innerText = 2;
    } else generateNumber();
  };

  //swipe right
  const swipeRight = () => {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  //swipe left
  const swipeLeft = () => {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  };

  //swipe up
  const swipeUp = () => {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  };

  //swipe up
  const swipeDown = () => {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  };

  const combineRow = () => {
    for (let i = 0; i < squares.length; i++) {
      if (i % 4 !== 3 && squares[i].innerHTML == squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
      }
    }
  };

  const combineColumn = () => {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;

        squares[i + width].innerHTML = 0;
      }
    }
  };

  const control = (event) => {
    if (event.key == "ArrowRight") {
      keyRight();
    }
    if (event.key == "ArrowLeft") {
      keyLeft();
    }
    if (event.key == "ArrowUp") {
      keyUp();
    }
    if (event.key == "ArrowDown") {
      keyDown();
    }
  };

  const keyRight = () => {
    swipeRight();
    combineRow();
    swipeRight();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };
  const keyLeft = () => {
    swipeLeft();
    combineRow();
    swipeLeft();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };
  const keyUp = () => {
    swipeUp();
    combineColumn();
    swipeUp();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };
  const keyDown = () => {
    swipeDown();
    combineColumn();
    swipeDown();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };

  const checkForWin = () => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "C Gagné !";
        document.removeEventListener("keyup", control);
        endGame();
      }
    }
  };

  const checkForGameOver = () => {
    let compteur = 0;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) compteur++;
    }

    if (compteur === 0) {
      resultDisplay.innerHTML = "C Perdu";
      document.removeEventListener("keyup", control);
      endGame();
    }
  };

  const endGame = () => {
    const endGameBox = document.querySelector(".endGameBox");

    // Ajout d'un bouton reload
    const reloadButton = document.createElement("button");
    reloadButton.innerHTML = "Recommencer";
    endGameBox.appendChild(reloadButton);
    reloadButton.addEventListener("click", () => {
      window.location.reload(true);
    });

    // Créer le boutton enregistrer
    const registerButton = document.createElement("button");
    registerButton.innerHTML = "Enregistrer ma perf";

    // Lier le lien vers php
    registerButton.addEventListener("click", () => {
      // Récupérer le pseudo et commentaire
      const pseudo = document.getElementById("pseudo").value;
      const comment = document.getElementById("comment").value;

      document.location.href =
        "?pseudo=" + pseudo + "&score=" + score + "&comment=" + comment;
    });

    // On ajoute les boutons et on affiche le tout
    endGameBox.appendChild(registerButton);
    endGameBox.classList.add("show");
  };

  createBoard();

  document.addEventListener("keyup", control);
});

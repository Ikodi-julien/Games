document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".deuxMilles__grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const width = 4;

  let squares = [];
  let score = 0;

  /* -----------------------------------------------------------------*/
  /* ----------------- COMMON AND MODEL ------------------------------*/
  /* -----------------------------------------------------------------*/
  // Create a playing board
  const createBoard = () => {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.classList.add("deuxMilles__square");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateNumber(squares);
    generateNumber(squares);
  };

  // Displays the board from squares list
  const displayNewBoard = (list) => {
    // On vide la grid de ses éléments
    while (gridDisplay.firstChild) {
      gridDisplay.removeChild(gridDisplay.firstChild);
    }

    // On créé les éléments à partir de la list
    list.forEach((element) => {
      gridDisplay.appendChild(element);
    });
  };

  // generate a number randomly
  const generateNumber = (squares) => {
    let randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerText == 0) {
      squares[randomNumber].innerText = 2;
      styleSquares(squares);
    } else generateNumber(squares);
  };

  const refreshScore = () => {
    // On fait la somme des chiffres dans la liste
    score = 0;
    for (let i = 0; i < squares.length; i++) {
      score += parseInt(squares[i].innerHTML);
    }
    scoreDisplay.innerHTML = score;
  };

  /*-------------------------------------------------------------*/
  /*------------- MOVES OPERATIONS ------------------------------*/
  /*-------------------------------------------------------------*/

  const combineRow = (squares, direction) => {
    if (direction == "left") {
      for (let i = 0; i < squares.length; i++) {
        if (i % 4 !== 3 && squares[i].innerHTML == squares[i + 1].innerHTML) {
          let combinedTotal =
            parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + 1].innerHTML = 0;
        }
      }
    } else {
      for (let i = squares.length - 1; i > 0; i--) {
        if (
          i % 4 !== 0 &&
          squares[i].innerText != 0 &&
          squares[i - 1].innerText != 0 &&
          squares[i].innerHTML === squares[i - 1].innerHTML
        ) {
          let combinedTotal =
            parseInt(squares[i].innerHTML) + parseInt(squares[i - 1].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i - 1].innerHTML = 0;
          return squares[i - 1];
        }
      }
    }
  };

  const combineColumn = (squares, direction) => {
    if (direction === "up") {
      for (let i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
          let combinedTotal =
            parseInt(squares[i].innerHTML) +
            parseInt(squares[i + width].innerHTML);
          squares[i].innerHTML = combinedTotal;

          squares[i + width].innerHTML = 0;
        }
      }
    } else {
      for (let i = squares.length - 1; i > 4; i--) {
        if (squares[i].innerHTML == squares[i - width].innerHTML) {
          let combinedTotal =
            parseInt(squares[i].innerHTML) +
            parseInt(squares[i - width].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i - width].innerHTML = 0;
        }
      }
    }
  };

  //swipe right
  const pushRight = () => {
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

  /* ---------------------------------------------------------------*/
  /* ------------------- STYLING -----------------------------------*/
  /* ---------------------------------------------------------------*/
  const swipRightStyle = (element) => {
    element.classList.add("deuxMilles--swRight");
  };

  const styleSquares = (squares) => {
    squares.forEach((element) => {
      element.classList.remove(element.classList.item(2));
      element.classList.remove(element.classList.item(1));
      // On met la classe en fonction du innerHtml de la case
      switch (element.innerHTML) {
        case "0":
          element.classList.add("deuxMilles__0");
          break;
        case "2":
          element.classList.add("deuxMilles__2");
          break;
        case "4":
          element.classList.add("deuxMilles__4");
          break;
        case "8":
          element.classList.add("deuxMilles__8");
          break;
        case "16":
          element.classList.add("deuxMilles__16");
          break;
        case "32":
          element.classList.add("deuxMilles__32");
          break;
        case "64":
          element.classList.add("deuxMilles__64");
          break;
        case "128":
          element.classList.add("deuxMilles__128");
          break;
        case "256":
          element.classList.add("deuxMilles__256");
          break;
        case "512":
          element.classList.add("deuxMilles__512");
          break;
        case "1024":
          element.classList.add("deuxMilles__1024");
          break;
        case "2048":
          element.classList.add("deuxMilles__2048");
          break;
        case "4096":
          element.classList.add("deuxMilles__4096");
          break;
        default:
          console.log(`Qu'il n'existe ${element}`);
      }
    });
  };

  /* ---------------------------------------------------------------- */
  /* ----------------- CONTROLS ------------------------------------- */
  /* ---------------------------------------------------------------- */

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

  /*--------------------------------------------------------------*/

  // 0.1- On identifie les cases contenant autre chose que 0 et ayant
  // un zero à leur droite
  const getDivToMoveRight = (list) => {
    var indexList = [];

    for (let i = 0; i < 15; i++) {
      if (i % 4 != 3 && list[i].innerText != 0 && list[i + 1].innerText == 0) {
        indexList.push(i);
      }
    }
    console.log("Index à bouger à droite : " + indexList);
    return indexList;
  };

  const getDivsToMerge = (list) => {
    var indexList = [];

    for (let i = 0; i < 15; i++) {
      if (
        i != 3 &&
        i % 4 != 3 &&
        list[i].innerText != 0 &&
        list[i + 1].innerText === list[i].innerText
      ) {
        indexList.push(i);
      }
    }
    console.log("Index à merger à droite : " + indexList);
    return indexList;
  };
  // 0.2- On déplace visuellement les divs concernées vers la droite
  // d'une case et on met à jour l'ordre des squares sans afficher
  const moveDivsToTheRight = (listIndex, info = true) => {
    listIndex.forEach((index) => {
      squares[index].classList.add("deuxMilles--moveRight");
      console.log(squares[index]);
      if (!info) {
        squares[index].classList.add("deuxMilles--under");
      }
    });
  };

  const fillDivsRight = () => {
    // On récupère l'index des divs à déplacer à droite
    let listIndexToMoveRight = getDivToMoveRight(squares);

    // On déplace visuellement les divs
    moveDivsToTheRight(listIndexToMoveRight);

    // On refait l'affichage après le temps d'animation
    setTimeout(() => {
      // On change les valeurs dans les divs
      squares = replaceElementInnerText(listIndexToMoveRight, squares);

      // on remet en place les divs
      removeClassMoveRight();

      // On refait le style du tableau
      styleSquares(squares);

      listIndexToMoveRight = getDivToMoveRight(squares);

      if (!listIndexToMoveRight.length) {
        return;
      } else {
        fillDivsRight();
      }
      console.log(listIndexToMoveRight.length);
    }, 30);
  };

  const mergeDivsRight = () => {
    // On identifie les cases ayant un nombre identique à leur droite
    let listDivsToMerge = getDivsToMerge(squares);
    console.log(listDivsToMerge.length);

    if (listDivsToMerge.length) {
      // On déplace visuellement les divs
      moveDivsToTheRight(listDivsToMerge);

      setTimeout(() => {
        // on affiche la somme des deux cases dans la case de droite,
        squares = replaceElementInnerText(listDivsToMerge, squares);

        // on remet en place les divs
        removeClassMoveRight();

        // On refait le style du tableau
        styleSquares(squares);

        listDivsToMerge = getDivToMoveRight(squares);

        if (!listDivsToMerge.length) {
          return;
        } else {
          mergeDivsRight();
        }
      });
    }
  };

  const replaceElementInnerText = (listIndex, listOfElements) => {
    // On remplace le contenu de l'élément i+1 par la somme i + (i+1)
    listIndex.forEach((index) => {
      let nb1 = parseInt(listOfElements[index].innerHTML);
      let nb2 = parseInt(listOfElements[index + 1].innerHTML);
      nb2 += nb1;
      listOfElements[index].innerHTML = 0;
      listOfElements[index + 1].innerHTML = nb2;
    });
    console.log("Ok replaceElementInnerText");
    return listOfElements;
  };

  const removeClassMoveRight = () => {
    var elementsWithClassToRemove = document.getElementsByClassName(
      "deuxMilles--moveRight"
    );

    while (elementsWithClassToRemove.length) {
      elementsWithClassToRemove
        .item(0)
        .classList.remove("deuxMilles--moveRight");
      elementsWithClassToRemove = document.getElementsByClassName(
        "deuxMilles--moveRight"
      );
    }
  };

  const keyRight = () => {
    fillDivsRight();
    setTimeout(() => {
      mergeDivsRight();
      fillDivsRight();
      setTimeout(() => {
        mergeDivsRight();
        fillDivsRight();
        setTimeout(() => {
          mergeDivsRight();
          fillDivsRight();
          checkForWin();
          checkForGameOver();
          refreshScore();
        }, 120);
      }, 120);
    }, 120);
  };
  const keyLeft = () => {
    swipeLeft();
    combineRow(squares, "left");
    swipeLeft();
    checkForWin();
    checkForGameOver();
    generateNumber(squares);
    refreshScore();
  };
  const keyUp = () => {
    swipeUp();
    combineColumn(squares, "up");
    swipeUp();
    checkForWin();
    checkForGameOver();
    generateNumber(squares);
    refreshScore();
  };
  const keyDown = () => {
    swipeDown();
    combineColumn(squares, "down");
    swipeDown();
    checkForWin();
    checkForGameOver();
    generateNumber(squares);
    refreshScore();
  };

  /*-------------------------------------------------------------------*/
  /*-------------- CHECKS AND ENDGAME ---------------------------------*/
  /*-------------------------------------------------------------------*/
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

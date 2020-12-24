document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".deuxMilles__grid");
  const scoreDisplay = document.getElementById("score");
  const width = 4;

  let squares = [];
  let score = 0;

  /* -----------------------------------------------------------------*/
  /* ----------------- COMMON AND MODEL ------------------------------*/
  /* -----------------------------------------------------------------*/
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

  /**
   * Add a "2" in an empty square (with "0" inside)
   * @param {Object[]} squares - List of HTML elts in grid
   */
  const generateNumber = (squares) => {
    let randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerText == 0) {
      squares[randomNumber].innerText = 2;
      styleSquares(squares);
      /// On ajoute une classe anime
      squares[randomNumber].classList.add("deuxMilles--newSquare");
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

  /* ---------------------------------------------------------------*/
  /* ------------------- STYLING -----------------------------------*/
  /* ---------------------------------------------------------------*/

  /**
   *
   * @param {Object[]} gridList - La liste des cases de la grid
   */
  const styleSquares = (gridList) => {
    gridList.forEach((element) => {
      element.classList.remove(element.classList.item(3));
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
    return gridList;
  };

  /*--------------------------------------------------------------*/

  /**
   * Returns a list of index of elts with 0 on their right
   * @param {Object[]} gridList - Liste des divs dans grid
   */
  const getDivToMove = (gridList, direction) => {
    var indexList = [];

    if (direction === "ArrowRight") {
      for (let i = 0; i < 15; i++) {
        if (
          i % 4 != 3 &&
          gridList[i].innerText != 0 &&
          gridList[i + 1].innerText == 0
        ) {
          indexList.push(i);
        }
      }
    } else if (direction === "ArrowLeft") {
      for (let i = 1; i < 16; i++) {
        if (
          i % 4 != 0 &&
          gridList[i].innerText != 0 &&
          gridList[i - 1].innerText == 0
        ) {
          indexList.push(i);
        }
      }
    } else if (direction === "ArrowUp") {
      for (let i = 15; i > 3; i--) {
        if (gridList[i].innerText != 0 && gridList[i - 4].innerText == 0) {
          indexList.push(i);
        }
      }
    } else if (direction === "ArrowDown") {
      for (let i = 0; i < 12; i++) {
        if (gridList[i].innerText != 0 && gridList[i + 4].innerText == 0) {
          indexList.push(i);
        }
      }
    }

    return indexList;
  };

  /**
   * Returns a list of index in order to merge corresponding elts
   * @param {Object[]} gridList -  Liste des divs dans grid
   */
  const getDivsToMerge = (gridList, direction) => {
    let indexList = [];

    if (direction === "ArrowRight") {
      for (let i = 0; i < 15; i++) {
        if (
          i != 3 &&
          i % 4 != 3 &&
          gridList[i].innerText != 0 &&
          gridList[i + 1].innerText === gridList[i].innerText
        ) {
          indexList.push(i);

          if (i != 2 && i % 4 != 2) {
            if (gridList[i].innerText === gridList[i + 2].innerText) {
              indexList.pop();
            }
          }
        }
      }
    } else if (direction === "ArrowLeft") {
      for (let i = 1; i < 16; i++) {
        if (
          i % 4 != 0 &&
          gridList[i].innerText != 0 &&
          gridList[i - 1].innerText === gridList[i].innerText
        ) {
          indexList.push(i);

          if (i != 1 && i % 4 != 1) {
            if (gridList[i].innerText === gridList[i - 2].innerText) {
              indexList.pop();
            }
          }
        }
      }
    } else if (direction === "ArrowUp") {
      for (let i = 15; i > 3; i--) {
        if (
          gridList[i].innerText != 0 &&
          gridList[i - 4].innerText === gridList[i].innerText
        ) {
          indexList.push(i);

          if (i > 7 && gridList[i].innerText === gridList[i - 8].innerText) {
            indexList.pop();
          }
        }
      }
    } else if (direction === "ArrowDown") {
      for (let i = 0; i < 12; i++) {
        if (
          gridList[i].innerText != 0 &&
          gridList[i + 4].innerText === gridList[i].innerText
        ) {
          indexList.push(i);

          if (i < 8 && gridList[i].innerText === gridList[i + 8].innerText) {
            indexList.pop();
          }
        }
      }
    }

    return indexList;
  };

  /**
   * Visually moves some elements by adding a class
   * @param {Object[]} gridList - Liste des divs dans grid, elt HTML
   */
  const visuallyMoveSquares = (gridList, direction) => {
    // On récupère l'index des divs à déplacer à droite
    let listIndex = getDivToMove(gridList, direction);
    //
    if (direction === "ArrowRight") {
      listIndex.forEach((index) => {
        gridList[index].classList.add("deuxMilles--moveRight");
      });
    } else if (direction === "ArrowLeft") {
      listIndex.forEach((index) => {
        gridList[index].classList.add("deuxMilles--moveLeft");
      });
    } else if (direction === "ArrowUp") {
      listIndex.forEach((index) => {
        gridList[index].classList.add("deuxMilles--moveUp");
      });
    } else if (direction === "ArrowDown") {
      listIndex.forEach((index) => {
        gridList[index].classList.add("deuxMilles--moveDown");
      });
    }
  };

  /**
   *Changes squares value, put them in place, style them and do it again
   * @param {Object[]} gridList - Liste des cases dans la grid
   */
  const refreshDisplay = (gridList, direction) => {
    let listIndexToMove = getDivToMove(gridList, direction);

    // On change les valeurs dans les divs
    gridList = replaceElementInnerText(direction, listIndexToMove, gridList);

    // on remet en place les divs
    removeClassVisualMove(direction);

    // On refait le style du tableau
    styleSquares(gridList);

    return gridList;
  };

  /**
   * Merge squares to the right
   * @param {number[]} listIndex - La liste des divs dans grid
   * @param {Object[]} gridList - La liste des divs dans grid
   */
  const mergeDivs = (direction, listIndex, gridList) => {
    gridList = replaceElementInnerText(direction, listIndex, gridList);

    // on remet en place les divs
    removeClassVisualMove(direction);

    // On refait le style du tableau
    return styleSquares(gridList);
  };

  /**
   * Do the math and replace text value in squares
   * @param {Object[]} listIndex - list d'index donnée par getDivsToMove ***
   * @param {Object[]} listOfElements - la liste des eléments dans grid
   */
  const replaceElementInnerText = (direction, indexList, gridList) => {
    if (direction === "ArrowRight") {
      indexList.forEach((index) => {
        let nb1 = parseInt(gridList[index].innerHTML);
        let nb2 = parseInt(gridList[index + 1].innerHTML);
        nb2 += nb1;
        gridList[index].innerHTML = 0;
        gridList[index + 1].innerHTML = nb2;
      });
    } else if (direction === "ArrowLeft") {
      indexList.forEach((index) => {
        let nb1 = parseInt(gridList[index].innerHTML);
        let nb2 = parseInt(gridList[index - 1].innerHTML);
        nb2 += nb1;
        gridList[index].innerHTML = 0;
        gridList[index - 1].innerHTML = nb2;
      });
    } else if (direction === "ArrowUp") {
      indexList.forEach((index) => {
        let nb1 = parseInt(gridList[index].innerHTML);
        let nb2 = parseInt(gridList[index - 4].innerHTML);
        nb2 += nb1;
        gridList[index].innerHTML = 0;
        gridList[index - 4].innerHTML = nb2;
      });
    } else if (direction === "ArrowDown") {
      indexList.forEach((index) => {
        let nb1 = parseInt(gridList[index].innerHTML);
        let nb2 = parseInt(gridList[index + 4].innerHTML);
        nb2 += nb1;
        gridList[index].innerHTML = 0;
        gridList[index + 4].innerHTML = nb2;
      });
    }

    return gridList;
  };

  /**
   * Removes class that visually moves éléments in grid.
   * @param {string} direction - La direction du mouvement.
   */
  const removeClassVisualMove = (direction) => {
    let classToRemove;
    if (direction === "ArrowRight") {
      classToRemove = "deuxMilles--moveRight";
    } else if (direction === "ArrowLeft") {
      classToRemove = "deuxMilles--moveLeft";
    } else if (direction === "ArrowUp") {
      classToRemove = "deuxMilles--moveUp";
    } else if (direction === "ArrowDown") {
      classToRemove = "deuxMilles--moveDown";
    }

    let elementsWithClassToRemove = document.getElementsByClassName(
      classToRemove
    );

    while (elementsWithClassToRemove.length) {
      elementsWithClassToRemove.item(0).classList.remove(classToRemove);
      elementsWithClassToRemove = document.getElementsByClassName(
        classToRemove
      );
    }
  };

  /* ---------------------------------------------------------------- */
  /* ----------------- CONTROLS / MOVES ------------------------------------- */
  /* ---------------------------------------------------------------- */

  const keyControl = (event) => {
    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      let eventKey = event.key;

      if (handleMoves(squares, eventKey)) {
        setTimeout(() => {
          checkForWin();
          generateNumber(squares);
          refreshScore();
        }, 250);
      } else {
        checkForGameOver(squares);
      }
    }
  };

  const touchControl = (direction) => {
    if (handleMoves(squares, direction)) {
      setTimeout(() => {
        checkForWin();
        generateNumber(squares);
        refreshScore();
      }, 250);
    } else {
      checkForGameOver(squares);
    }
  };

  /**
   * Handles squares moves
   * @param {Object[]} gridList - La liste des divs dans grid
   * @param {string} direction - La string renvoyée par event.key
   */
  const handleMoves = (gridList, direction) => {
    // On regarde déja si un mvt est possible
    if (
      getDivToMove(gridList, direction).length ||
      getDivsToMerge(gridList, direction).length
    ) {
      gridList = mergeDivs(
        direction,
        getDivsToMerge(gridList, direction),
        gridList
      );

      if (
        getDivToMove(gridList, direction).length ||
        getDivsToMerge(gridList, direction).length
      ) {
        visuallyMoveSquares(gridList, direction);
        setTimeout(() => {
          gridList = refreshDisplay(gridList, direction);
          gridList = mergeDivs(
            direction,
            getDivsToMerge(gridList, direction),
            gridList
          );

          if (
            getDivToMove(gridList, direction).length ||
            getDivsToMerge(gridList, direction).length
          ) {
            visuallyMoveSquares(gridList, direction);
            setTimeout(() => {
              gridList = refreshDisplay(gridList, direction);
              gridList = mergeDivs(
                direction,
                getDivsToMerge(gridList, direction),
                gridList
              );

              if (
                getDivToMove(gridList, direction).length ||
                getDivsToMerge(gridList, direction).length
              ) {
                visuallyMoveSquares(gridList, direction);
                setTimeout(() => {
                  gridList = refreshDisplay(gridList, direction);
                  gridList = mergeDivs(
                    direction,
                    getDivsToMerge(gridList, direction),
                    gridList
                  );

                  if (
                    getDivToMove(gridList, direction).length ||
                    getDivsToMerge(gridList, direction).length
                  ) {
                    console.log("itération 4 et dernière");
                    visuallyMoveSquares(gridList, direction);
                    setTimeout(() => {
                      gridList = refreshDisplay(gridList, direction);
                      gridList = mergeDivs(
                        direction,
                        getDivsToMerge(gridList, direction),
                        gridList
                      );
                    }, 35);
                  }
                }, 35);
              }
            }, 35);
          }
        }, 35);
      }
      return true;
    } else {
      return false;
    }
  };
  /*-------------------------------------------------------------------*/
  /*-------------- CHECKS AND ENDGAME ---------------------------------*/
  /*-------------------------------------------------------------------*/
  const checkForWin = () => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        const winnerDisplay = document.getElementById("deuxMilles__winner");
        winnerDisplay.classList.add("deuxMilles__winner__show");

        winnerDisplay.addEventListener("click", endGame);

        const gameOverDisplay = document.getElementById("gameOverDisplay");
        gameOverDisplay.innerHTML = "FÉLICITATIONS !! (Je suis jaloux)";
      }
    }
    console.log("checkForWin");
  };

  const checkForGameOver = (gridList) => {
    // On va chercher s'il reste des 0 ou qu'il est possible de merger des squares
    let zeros = 0;

    for (let i = 0; i < gridList.length; i++) {
      if (gridList[i].innerHTML == 0) zeros++;
    }
    console.log("nb 0 : " + zeros);
    if (
      !zeros &&
      getDivsToMerge(gridList, "ArrowRight").length === 0 &&
      getDivsToMerge(gridList, "ArrowDown").length === 0 &&
      getDivsToMerge(gridList, "ArrowUp").length === 0 &&
      getDivsToMerge(gridList, "ArrowLeft").length === 0
    ) {
      document.removeEventListener("keyup", control);

      setTimeout(endGame, 200);
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

  /*---------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------*/
  /*---------------------------------------------------------------------------*/

  const touchSurface = document.getElementById("deuxMilles__touchsurface");
  let touchStartX,
    touchStartY,
    distanceX,
    distanceY,
    minDistanceRequired = 150, //required min distance traveled to be considered swipe
    maxDistanceOtherDirection = 100, // maximum distance allowed at the same time in perpendicular direction    allowedTime = 200, // maximum time allowed to travel that distance
    allowedTime = 300,
    elapsedTime,
    startTime,
    swipeDirection;

  /*----------------------------------------------------------------------------*/
  /*----------------------------------------------------------------------------*/
  /*----------------------------------------------------------------------------*/

  touchSurface.addEventListener(
    "touchstart",
    (event) => {
      console.log("touche start");
      let touch = event.changedTouches[0];
      swipeDirection = "none";
      fingerDistance = 0;
      touchStartX = touch.pageX;
      touchStartY = touch.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      event.preventDefault();
    },
    false
  );

  touchSurface.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault(); // prevent scrolling when inside DIV
    },
    false
  );

  touchSurface.addEventListener(
    "touchend",
    (event) => {
      let touch = event.changedTouches[0];
      distanceX = touch.pageX - touchStartX;
      distanceY = touch.pageY - touchStartY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime < allowedTime) {
        if (
          Math.abs(distanceX) > minDistanceRequired &&
          Math.abs(distanceY) < maxDistanceOtherDirection
        ) {
          if (distanceX > 0) swipeDirection = "ArrowRight";
          if (distanceX < 0) swipeDirection = "ArrowLeft";
        } else if (
          Math.abs(distanceY) > minDistanceRequired &&
          Math.abs(distanceX) < maxDistanceOtherDirection
        ) {
          if (distanceY > 0) swipeDirection = "ArrowDown";
          if (distanceY < 0) swipeDirection = "ArrowUp";
        }
      }
      touchControl(swipeDirection);

      event.preventDefault();
    },
    false
  );

  createBoard();

  document.addEventListener("keyup", keyControl);
});

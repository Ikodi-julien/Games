"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var gridDisplay = document.querySelector(".deuxMilles__grid");
  var scoreDisplay = document.getElementById("score");
  var width = 4;
  var squares = [];
  var score = 0;
  /* -----------------------------------------------------------------*/

  /* ----------------- COMMON AND MODEL ------------------------------*/

  /* -----------------------------------------------------------------*/

  var createBoard = function createBoard() {
    for (var i = 0; i < width * width; i++) {
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


  var generateNumber = function generateNumber(squares) {
    var randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerText == 0) {
      squares[randomNumber].innerText = 2;
      styleSquares(squares); /// On ajoute une classe anime

      squares[randomNumber].classList.add("deuxMilles--newSquare");
    } else generateNumber(squares);
  };

  var refreshScore = function refreshScore() {
    // On fait la somme des chiffres dans la liste
    score = 0;

    for (var i = 0; i < squares.length; i++) {
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


  var styleSquares = function styleSquares(gridList) {
    gridList.forEach(function (element) {
      element.classList.remove(element.classList.item(3));
      element.classList.remove(element.classList.item(2));
      element.classList.remove(element.classList.item(1)); // On met la classe en fonction du innerHtml de la case

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
          console.log("Qu'il n'existe ".concat(element));
      }
    });
    return gridList;
  };
  /*--------------------------------------------------------------*/

  /**
   * Returns a list of index of elts with 0 on their right
   * @param {Object[]} gridList - Liste des divs dans grid
   */


  var getDivToMove = function getDivToMove(gridList, direction) {
    var indexList = [];

    if (direction === "ArrowRight") {
      for (var i = 0; i < 15; i++) {
        if (i % 4 != 3 && gridList[i].innerText != 0 && gridList[i + 1].innerText == 0) {
          indexList.push(i);
        }
      }
    } else if (direction === "ArrowLeft") {
      for (var _i = 1; _i < 16; _i++) {
        if (_i % 4 != 0 && gridList[_i].innerText != 0 && gridList[_i - 1].innerText == 0) {
          indexList.push(_i);
        }
      }
    } else if (direction === "ArrowUp") {
      for (var _i2 = 15; _i2 > 3; _i2--) {
        if (gridList[_i2].innerText != 0 && gridList[_i2 - 4].innerText == 0) {
          indexList.push(_i2);
        }
      }
    } else if (direction === "ArrowDown") {
      for (var _i3 = 0; _i3 < 12; _i3++) {
        if (gridList[_i3].innerText != 0 && gridList[_i3 + 4].innerText == 0) {
          indexList.push(_i3);
        }
      }
    }

    return indexList;
  };
  /**
   * Returns a list of index in order to merge corresponding elts
   * @param {Object[]} gridList -  Liste des divs dans grid
   */


  var getDivsToMerge = function getDivsToMerge(gridList, direction) {
    var indexList = [];

    if (direction === "ArrowRight") {
      for (var i = 0; i < 15; i++) {
        if (i != 3 && i % 4 != 3 && gridList[i].innerText != 0 && gridList[i + 1].innerText === gridList[i].innerText) {
          indexList.push(i);

          if (i != 2 && i % 4 != 2) {
            if (gridList[i].innerText === gridList[i + 2].innerText) {
              indexList.pop();
            }
          }
        }
      }
    } else if (direction === "ArrowLeft") {
      for (var _i4 = 1; _i4 < 16; _i4++) {
        if (_i4 % 4 != 0 && gridList[_i4].innerText != 0 && gridList[_i4 - 1].innerText === gridList[_i4].innerText) {
          indexList.push(_i4);

          if (_i4 != 1 && _i4 % 4 != 1) {
            if (gridList[_i4].innerText === gridList[_i4 - 2].innerText) {
              indexList.pop();
            }
          }
        }
      }
    } else if (direction === "ArrowUp") {
      for (var _i5 = 15; _i5 > 3; _i5--) {
        if (gridList[_i5].innerText != 0 && gridList[_i5 - 4].innerText === gridList[_i5].innerText) {
          indexList.push(_i5);

          if (_i5 > 7 && gridList[_i5].innerText === gridList[_i5 - 8].innerText) {
            indexList.pop();
          }
        }
      }
    } else if (direction === "ArrowDown") {
      for (var _i6 = 0; _i6 < 12; _i6++) {
        if (gridList[_i6].innerText != 0 && gridList[_i6 + 4].innerText === gridList[_i6].innerText) {
          indexList.push(_i6);

          if (_i6 < 8 && gridList[_i6].innerText === gridList[_i6 + 8].innerText) {
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


  var visuallyMoveSquares = function visuallyMoveSquares(gridList, direction) {
    // On récupère l'index des divs à déplacer à droite
    var listIndex = getDivToMove(gridList, direction); //

    if (direction === "ArrowRight") {
      listIndex.forEach(function (index) {
        gridList[index].classList.add("deuxMilles--moveRight");
      });
    } else if (direction === "ArrowLeft") {
      listIndex.forEach(function (index) {
        gridList[index].classList.add("deuxMilles--moveLeft");
      });
    } else if (direction === "ArrowUp") {
      listIndex.forEach(function (index) {
        gridList[index].classList.add("deuxMilles--moveUp");
      });
    } else if (direction === "ArrowDown") {
      listIndex.forEach(function (index) {
        gridList[index].classList.add("deuxMilles--moveDown");
      });
    }
  };
  /**
   *Changes squares value, put them in place, style them and do it again
   * @param {Object[]} gridList - Liste des cases dans la grid
   */


  var refreshDisplay = function refreshDisplay(gridList, direction) {
    var listIndexToMove = getDivToMove(gridList, direction); // On change les valeurs dans les divs

    gridList = replaceElementInnerText(direction, listIndexToMove, gridList); // on remet en place les divs

    removeClassVisualMove(direction); // On refait le style du tableau

    styleSquares(gridList);
    return gridList;
  };
  /**
   * Merge squares to the right
   * @param {number[]} listIndex - La liste des divs dans grid
   * @param {Object[]} gridList - La liste des divs dans grid
   */


  var mergeDivs = function mergeDivs(direction, listIndex, gridList) {
    gridList = replaceElementInnerText(direction, listIndex, gridList); // on remet en place les divs

    removeClassVisualMove(direction); // On refait le style du tableau

    return styleSquares(gridList);
  };
  /**
   * Do the math and replace text value in squares
   * @param {Object[]} listIndex - list d'index donnée par getDivsToMove ***
   * @param {Object[]} listOfElements - la liste des eléments dans grid
   */


  var replaceElementInnerText = function replaceElementInnerText(direction, indexList, gridList) {
    if (direction === "ArrowRight") {
      indexList.forEach(function (index) {
        var nb1 = parseInt(gridList[index].innerHTML);
        var nb2 = parseInt(gridList[index + 1].innerHTML);
        nb2 += nb1;
        gridList[index].innerHTML = 0;
        gridList[index + 1].innerHTML = nb2;
      });
    } else if (direction === "ArrowLeft") {
      indexList.forEach(function (index) {
        var nb1 = parseInt(gridList[index].innerHTML);
        var nb2 = parseInt(gridList[index - 1].innerHTML);
        nb2 += nb1;
        gridList[index].innerHTML = 0;
        gridList[index - 1].innerHTML = nb2;
      });
    } else if (direction === "ArrowUp") {
      indexList.forEach(function (index) {
        var nb1 = parseInt(gridList[index].innerHTML);
        var nb2 = parseInt(gridList[index - 4].innerHTML);
        nb2 += nb1;
        gridList[index].innerHTML = 0;
        gridList[index - 4].innerHTML = nb2;
      });
    } else if (direction === "ArrowDown") {
      indexList.forEach(function (index) {
        var nb1 = parseInt(gridList[index].innerHTML);
        var nb2 = parseInt(gridList[index + 4].innerHTML);
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


  var removeClassVisualMove = function removeClassVisualMove(direction) {
    var classToRemove;

    if (direction === "ArrowRight") {
      classToRemove = "deuxMilles--moveRight";
    } else if (direction === "ArrowLeft") {
      classToRemove = "deuxMilles--moveLeft";
    } else if (direction === "ArrowUp") {
      classToRemove = "deuxMilles--moveUp";
    } else if (direction === "ArrowDown") {
      classToRemove = "deuxMilles--moveDown";
    }

    var elementsWithClassToRemove = document.getElementsByClassName(classToRemove);

    while (elementsWithClassToRemove.length) {
      elementsWithClassToRemove.item(0).classList.remove(classToRemove);
      elementsWithClassToRemove = document.getElementsByClassName(classToRemove);
    }
  };
  /* ---------------------------------------------------------------- */

  /* ----------------- CONTROLS / MOVES ------------------------------------- */

  /* ---------------------------------------------------------------- */


  var keyControl = function keyControl(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown") {
      var eventKey = event.key;

      if (handleMoves(squares, eventKey)) {
        setTimeout(function () {
          checkForWin();
          generateNumber(squares);
          refreshScore();
        }, 250);
      } else {
        checkForGameOver(squares);
      }
    }
  };

  var touchControl = function touchControl(direction) {
    if (handleMoves(squares, direction)) {
      setTimeout(function () {
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


  var handleMoves = function handleMoves(gridList, direction) {
    // On regarde déja si un mvt est possible
    if (getDivToMove(gridList, direction).length || getDivsToMerge(gridList, direction).length) {
      gridList = mergeDivs(direction, getDivsToMerge(gridList, direction), gridList);

      if (getDivToMove(gridList, direction).length || getDivsToMerge(gridList, direction).length) {
        visuallyMoveSquares(gridList, direction);
        setTimeout(function () {
          gridList = refreshDisplay(gridList, direction);
          gridList = mergeDivs(direction, getDivsToMerge(gridList, direction), gridList);

          if (getDivToMove(gridList, direction).length || getDivsToMerge(gridList, direction).length) {
            visuallyMoveSquares(gridList, direction);
            setTimeout(function () {
              gridList = refreshDisplay(gridList, direction);
              gridList = mergeDivs(direction, getDivsToMerge(gridList, direction), gridList);

              if (getDivToMove(gridList, direction).length || getDivsToMerge(gridList, direction).length) {
                visuallyMoveSquares(gridList, direction);
                setTimeout(function () {
                  gridList = refreshDisplay(gridList, direction);
                  gridList = mergeDivs(direction, getDivsToMerge(gridList, direction), gridList);

                  if (getDivToMove(gridList, direction).length || getDivsToMerge(gridList, direction).length) {
                    console.log("itération 4 et dernière");
                    visuallyMoveSquares(gridList, direction);
                    setTimeout(function () {
                      gridList = refreshDisplay(gridList, direction);
                      gridList = mergeDivs(direction, getDivsToMerge(gridList, direction), gridList);
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


  var checkForWin = function checkForWin() {
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        var winnerDisplay = document.getElementById("deuxMilles__winner");
        winnerDisplay.classList.add("deuxMilles__winner__show");
        winnerDisplay.addEventListener("click", endGame);
        var gameOverDisplay = document.getElementById("gameOverDisplay");
        gameOverDisplay.innerHTML = "FÉLICITATIONS !! (Je suis jaloux)";
      }
    }

    console.log("checkForWin");
  };

  var checkForGameOver = function checkForGameOver(gridList) {
    // On va chercher s'il reste des 0 ou qu'il est possible de merger des squares
    var zeros = 0;

    for (var i = 0; i < gridList.length; i++) {
      if (gridList[i].innerHTML == 0) zeros++;
    }

    console.log("nb 0 : " + zeros);

    if (!zeros && getDivsToMerge(gridList, "ArrowRight").length === 0 && getDivsToMerge(gridList, "ArrowDown").length === 0 && getDivsToMerge(gridList, "ArrowUp").length === 0 && getDivsToMerge(gridList, "ArrowLeft").length === 0) {
      document.removeEventListener("keyup", control);
      setTimeout(endGame, 200);
    }
  };

  var endGame = function endGame() {
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
    }); // On ajoute les boutons et on affiche le tout

    endGameBox.appendChild(registerButton);
    endGameBox.classList.add("show");
  };
  /*---------------------------------------------------------------------------*/

  /*---------------------------------------------------------------------------*/

  /*---------------------------------------------------------------------------*/


  var touchSurface = document.getElementById("deuxMilles__touchsurface");
  var touchStartX,
      touchStartY,
      distanceX,
      distanceY,
      minDistanceRequired = 150,
      //required min distance traveled to be considered swipe
  maxDistanceOtherDirection = 100,
      // maximum distance allowed at the same time in perpendicular direction    allowedTime = 200, // maximum time allowed to travel that distance
  allowedTime = 300,
      elapsedTime,
      startTime,
      swipeDirection;
  /*----------------------------------------------------------------------------*/

  /*----------------------------------------------------------------------------*/

  /*----------------------------------------------------------------------------*/

  touchSurface.addEventListener("touchstart", function (event) {
    console.log("touche start");
    var touch = event.changedTouches[0];
    swipeDirection = "none";
    fingerDistance = 0;
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
    startTime = new Date().getTime(); // record time when finger first makes contact with surface

    event.preventDefault();
  }, false);
  touchSurface.addEventListener("touchmove", function (event) {
    event.preventDefault(); // prevent scrolling when inside DIV
  }, false);
  touchSurface.addEventListener("touchend", function (event) {
    var touch = event.changedTouches[0];
    distanceX = touch.pageX - touchStartX;
    distanceY = touch.pageY - touchStartY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime < allowedTime) {
      if (Math.abs(distanceX) > minDistanceRequired && Math.abs(distanceY) < maxDistanceOtherDirection) {
        if (distanceX > 0) swipeDirection = "ArrowRight";
        if (distanceX < 0) swipeDirection = "ArrowLeft";
      } else if (Math.abs(distanceY) > minDistanceRequired && Math.abs(distanceX) < maxDistanceOtherDirection) {
        if (distanceY > 0) swipeDirection = "ArrowDown";
        if (distanceY < 0) swipeDirection = "ArrowUp";
      }
    }

    touchControl(swipeDirection);
    event.preventDefault();
  }, false);
  createBoard();
  document.addEventListener("keyup", keyControl);
});
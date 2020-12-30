"use strict";

var _endGame = require("../endGame.js");

document.addEventListener("DOMContentLoaded", function () {
  var gridDisplay = document.querySelector(".deuxMilles__grid");
  var scoreDisplay = document.getElementById("score");
  var width = 4;
  var squares = [];
  var score = 0;
  var endGameShowed = false;
  /* -----------------------------------------------------------------*/

  /* ----------------------- BASE ------------------------------------*/

  /* -----------------------------------------------------------------*/

  /**
   * Create divs and append them to the gridDisplay
   */

  var createBoard = function createBoard() {
    for (var i = 0; i < width * width; i++) {
      var square = document.createElement("div");
      square.classList.add("deuxMilles__square");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    generateNumber(squares);
    generateNumber(squares);
  };
  /**
   * Add a "2" in an empty square (with previously "0" inside)
   * @param {Object[]} squaresList - List of HTML elts in grid
   */


  var generateNumber = function generateNumber(squaresList) {
    var randomNumber = Math.floor(Math.random() * squaresList.length);

    if (squaresList[randomNumber].innerText == 0) {
      squaresList[randomNumber].innerText = 2;
      styleSquares(squaresList); /// On ajoute une classe anime

      squaresList[randomNumber].classList.add("deuxMilles--newSquare");
    } else generateNumber(squaresList);
  };
  /**
   * Displays the score in scoreDisplay
   */


  var refreshScore = function refreshScore() {
    // On fait la somme des chiffres dans la grid
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
   * set a square' style considering its inner conntent
   * @param {Object[]} squaresList - La liste des cases de la grid
   */


  var styleSquares = function styleSquares(squaresList) {
    squaresList.forEach(function (element) {
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
    return squaresList;
  };
  /*--------------------------------------------------------------*/

  /**
   * Returns a list of index of elts with 0 considering the direction given
   * @param {Object[]} squaresList - Liste des divs dans grid
   * @param {string} direction
   */


  var getSquaresToMove = function getSquaresToMove(squaresList, direction) {
    var indexList = [];

    if (direction === "ArrowRight") {
      for (var i = 0; i < 15; i++) {
        if (i % 4 != 3 && squaresList[i].innerText != 0 && squaresList[i + 1].innerText == 0) {
          indexList.push(i);
        }
      }
    } else if (direction === "ArrowLeft") {
      for (var _i = 1; _i < 16; _i++) {
        if (_i % 4 != 0 && squaresList[_i].innerText != 0 && squaresList[_i - 1].innerText == 0) {
          indexList.push(_i);
        }
      }
    } else if (direction === "ArrowUp") {
      for (var _i2 = 15; _i2 > 3; _i2--) {
        if (squaresList[_i2].innerText != 0 && squaresList[_i2 - 4].innerText == 0) {
          indexList.push(_i2);
        }
      }
    } else if (direction === "ArrowDown") {
      for (var _i3 = 0; _i3 < 12; _i3++) {
        if (squaresList[_i3].innerText != 0 && squaresList[_i3 + 4].innerText == 0) {
          indexList.push(_i3);
        }
      }
    }

    return indexList;
  };
  /**
   * Returns a list of index in order to merge corresponding elts
   * @param {Object[]} squaresList -  Liste des divs dans grid
   * @param {string} direction
   */


  var getSquaresToMerge = function getSquaresToMerge(squaresList, direction) {
    var indexList = [];

    if (direction === "ArrowRight") {
      for (var i = 0; i < 15; i++) {
        if (i != 3 && i % 4 != 3 && squaresList[i].innerText != 0 && squaresList[i + 1].innerText === squaresList[i].innerText) {
          indexList.push(i);

          if (i != 2 && i % 4 != 2) {
            if (squaresList[i].innerText === squaresList[i + 2].innerText) {
              indexList.pop();
            }
          }
        }
      }
    } else if (direction === "ArrowLeft") {
      for (var _i4 = 1; _i4 < 16; _i4++) {
        if (_i4 % 4 != 0 && squaresList[_i4].innerText != 0 && squaresList[_i4 - 1].innerText === squaresList[_i4].innerText) {
          indexList.push(_i4);

          if (_i4 != 1 && _i4 % 4 != 1) {
            if (squaresList[_i4].innerText === squaresList[_i4 - 2].innerText) {
              indexList.pop();
            }
          }
        }
      }
    } else if (direction === "ArrowUp") {
      for (var _i5 = 15; _i5 > 3; _i5--) {
        if (squaresList[_i5].innerText != 0 && squaresList[_i5 - 4].innerText === squaresList[_i5].innerText) {
          indexList.push(_i5);

          if (_i5 > 7 && squaresList[_i5].innerText === squaresList[_i5 - 8].innerText) {
            indexList.pop();
          }
        }
      }
    } else if (direction === "ArrowDown") {
      for (var _i6 = 0; _i6 < 12; _i6++) {
        if (squaresList[_i6].innerText != 0 && squaresList[_i6 + 4].innerText === squaresList[_i6].innerText) {
          indexList.push(_i6);

          if (_i6 < 8 && squaresList[_i6].innerText === squaresList[_i6 + 8].innerText) {
            indexList.pop();
          }
        }
      }
    }

    return indexList;
  };
  /**
   * Visually moves some elements by adding a class
   * @param {Object[]} squaresList - Liste des divs dans grid, elt HTML
   * @param {string} direction
   */


  var visuallyMoveSquares = function visuallyMoveSquares(squaresList, direction) {
    // On récupère l'index des divs à déplacer à droite
    var listIndex = getSquaresToMove(squaresList, direction); //

    if (direction === "ArrowRight") {
      listIndex.forEach(function (index) {
        squaresList[index].classList.add("deuxMilles--moveRight");
      });
    } else if (direction === "ArrowLeft") {
      listIndex.forEach(function (index) {
        squaresList[index].classList.add("deuxMilles--moveLeft");
      });
    } else if (direction === "ArrowUp") {
      listIndex.forEach(function (index) {
        squaresList[index].classList.add("deuxMilles--moveUp");
      });
    } else if (direction === "ArrowDown") {
      listIndex.forEach(function (index) {
        squaresList[index].classList.add("deuxMilles--moveDown");
      });
    }
  };
  /**
   * Visually merges some elements by adding a class
   * @param {Object[]} squaresList - Liste des divs dans grid, elt HTML
   * @param {string} direction
   */


  var visuallyMergeSquares = function visuallyMergeSquares(squaresList, direction) {
    // On récupère l'index des divs à déplacer à droite
    getSquaresToMerge(squaresList, direction).forEach(function (index) {
      if (direction === "ArrowRight") {
        squaresList[index].classList.add("deuxMilles--mergeRight");
      } else if (direction === "ArrowLeft") {
        squaresList[index].classList.add("deuxMilles--mergeLeft");
      } else if (direction === "ArrowUp") {
        squaresList[index].classList.add("deuxMilles--mergeUp");
      } else if (direction === "ArrowDown") {
        squaresList[index].classList.add("deuxMilles--mergeDown");
      }
    });
  };
  /**
   *Changes squares value, put them in place, style them and do it again
   * @param {Object[]} squaresList - Liste des cases dans la grid
   * @param {string} direction
   */


  var refreshDisplay = function refreshDisplay(squaresList, direction) {
    var listIndexToMove = getSquaresToMove(squaresList, direction); // On change les valeurs dans les divs

    squaresList = replaceElementInnerText(direction, listIndexToMove, squaresList); // on remet en place les divs

    removeClassVisualMove(direction); // On refait le style du tableau

    styleSquares(squaresList);
    return squaresList;
  };
  /**
   * Merge squares
   * @param {string} direction
   * @param {number[]} listIndex - La liste des index des divs concernées
   * @param {Object[]} squaresList - La liste des divs dans grid
   */


  var mergeDivs = function mergeDivs(direction, listIndex, squaresList) {
    squaresList = replaceElementInnerText(direction, listIndex, squaresList); // on remet en place les divs

    removeClassVisualMove(direction); // On refait le style du tableau

    return styleSquares(squaresList);
  };
  /**
   * Do the math and replace text value in squares
   * @param {string} direction
   * @param {Object[]} listIndex - liste d'index donnée par getDivsToMove ***
   * @param {Object[]} squaresList - la liste des eléments dans grid
   */


  var replaceElementInnerText = function replaceElementInnerText(direction, indexList, squaresList) {
    var nbToBeNull, nbSum;
    indexList.forEach(function (index) {
      nbToBeNull = parseInt(squaresList[index].innerHTML);

      if (direction === "ArrowRight") {
        nbSum = parseInt(squaresList[index + 1].innerHTML);
        nbSum += nbToBeNull;
        squaresList[index].innerHTML = 0;
        squaresList[index + 1].innerHTML = nbSum;
      } else if (direction === "ArrowLeft") {
        nbSum = parseInt(squaresList[index - 1].innerHTML);
        nbSum += nbToBeNull;
        squaresList[index].innerHTML = 0;
        squaresList[index - 1].innerHTML = nbSum;
      } else if (direction === "ArrowUp") {
        nbSum = parseInt(squaresList[index - 4].innerHTML);
        nbSum += nbToBeNull;
        squaresList[index].innerHTML = 0;
        squaresList[index - 4].innerHTML = nbSum;
      } else if (direction === "ArrowDown") {
        nbSum = parseInt(squaresList[index + 4].innerHTML);
        nbSum += nbToBeNull;
        squaresList[index].innerHTML = 0;
        squaresList[index + 4].innerHTML = nbSum;
      }
    });
    return squaresList;
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

  /* ----------------- CONTROLS / HANDLING MOVES ------------------------------------- */

  /* ---------------------------------------------------------------- */

  /**
   * Initiate squares movements using event.key
   * @param {Object} event
   */


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
  /**
   * Initiate squares movements using touch events
   * @param {string} direction
   */


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
   * @param {Object[]} squaresList - La liste des divs dans grid
   * @param {string} direction - La string renvoyée par event.key
   */


  var handleMoves = function handleMoves(squaresList, direction) {
    // On regarde déja si un mvt est possible
    if (getSquaresToMove(squaresList, direction).length || getSquaresToMerge(squaresList, direction).length) {
      visuallyMoveSquares(squaresList, direction);
      visuallyMergeSquares(squaresList, direction);
      setTimeout(function () {
        squaresList = refreshDisplay(squaresList, direction);
        squaresList = mergeDivs(direction, getSquaresToMerge(squaresList, direction), squaresList);
        handleMoves(squaresList, direction);
      }, 50);
      return true;
    } else {
      return false;
    }
  };
  /*-------------------------------------------------------------------*/

  /*-------------- CHECKS AND ENDGAME ---------------------------------*/

  /*-------------------------------------------------------------------*/


  var checkForWin = function checkForWin() {
    // On regarde si une case contient 2048
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 8) {
        var winnerDisplay = document.getElementById("deuxMilles__winner");
        winnerDisplay.classList.add("deuxMilles__winner__show");
        var gameOverDisplay = document.getElementById("gameOverDisplay");
        gameOverDisplay.innerHTML = "FÉLICITATIONS !! (Je suis jaloux)";
        winnerDisplay.addEventListener("click", function () {
          if (!endGameShowed) {
            (0, _endGame.endGame)(score);
            endGameShowed = true;
          }
        });
      }
    }

    console.log("checkForWin");
  };

  var checkForGameOver = function checkForGameOver(squaresList) {
    // On va chercher s'il reste des 0 ou qu'il est possible de merger des squares
    var zeros = 0;

    for (var i = 0; i < squaresList.length; i++) {
      if (squaresList[i].innerHTML == 0) zeros++;
    }

    console.log("nb 0 : " + zeros);

    if (!zeros && getSquaresToMerge(squaresList, "ArrowRight").length === 0 && getSquaresToMerge(squaresList, "ArrowDown").length === 0 && getSquaresToMerge(squaresList, "ArrowUp").length === 0 && getSquaresToMerge(squaresList, "ArrowLeft").length === 0) {
      document.removeEventListener("keyup", keyControl);
      setTimeout(function () {
        (0, _endGame.endGame)(score);
      }, 150);
      endGameShowed = true;
    }
  };

  createBoard();
  document.addEventListener("keyup", keyControl);
  /*---------------------------------------------------------------------------*/

  /*------------------ FONCTIONS SWIPE ----------------------------------------*/

  /*---------------------------------------------------------------------------*/

  var touchSurface = document.getElementById("deuxMilles__touchsurface");
  var touchStartX,
      touchStartY,
      distanceX,
      distanceY,
      minDistanceRequired = 70,
      //required min distance traveled to be considered swipe
  maxDistanceOtherDirection = 60,
      // maximum distance allowed at the same time in perpendicular direction    allowedTime = 200, // maximum time allowed to travel that distance
  allowedTime = 350,
      elapsedTime,
      startTime,
      swipeDirection;
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
});
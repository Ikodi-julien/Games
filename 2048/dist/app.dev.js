"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var gridDisplay = document.querySelector(".deuxMilles__grid");
  var scoreDisplay = document.getElementById("score");
  var resultDisplay = document.getElementById("result");
  var width = 4;
  var squares = [];
  var score = 0;
  /* -----------------------------------------------------------------*/

  /* ----------------- COMMON AND MODEL ------------------------------*/

  /* -----------------------------------------------------------------*/
  // Create a playing board

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
  }; // Displays the board from squares list


  var displayNewBoard = function displayNewBoard(list) {
    // On vide la grid de ses éléments
    while (gridDisplay.firstChild) {
      gridDisplay.removeChild(gridDisplay.firstChild);
    } // On créé les éléments à partir de la list


    list.forEach(function (element) {
      gridDisplay.appendChild(element);
    });
  }; // generate a number randomly


  var generateNumber = function generateNumber(squares) {
    var randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerText == 0) {
      squares[randomNumber].innerText = 2;
      styleSquares(squares);
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
  /*-------------------------------------------------------------*/

  /*------------- MOVES OPERATIONS ------------------------------*/

  /*-------------------------------------------------------------*/


  var combineRow = function combineRow(squares, direction) {
    if (direction == "left") {
      for (var i = 0; i < squares.length; i++) {
        if (i % 4 !== 3 && squares[i].innerHTML == squares[i + 1].innerHTML) {
          var combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + 1].innerHTML = 0;
        }
      }
    } else {
      for (var _i = squares.length - 1; _i > 0; _i--) {
        if (_i % 4 !== 0 && squares[_i].innerText != 0 && squares[_i - 1].innerText != 0 && squares[_i].innerHTML === squares[_i - 1].innerHTML) {
          var _combinedTotal = parseInt(squares[_i].innerHTML) + parseInt(squares[_i - 1].innerHTML);

          squares[_i].innerHTML = _combinedTotal;
          squares[_i - 1].innerHTML = 0;
          return squares[_i - 1];
        }
      }
    }
  };

  var combineColumn = function combineColumn(squares, direction) {
    if (direction === "up") {
      for (var i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
          var combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + width].innerHTML = 0;
        }
      }
    } else {
      for (var _i2 = squares.length - 1; _i2 > 4; _i2--) {
        if (squares[_i2].innerHTML == squares[_i2 - width].innerHTML) {
          var _combinedTotal2 = parseInt(squares[_i2].innerHTML) + parseInt(squares[_i2 - width].innerHTML);

          squares[_i2].innerHTML = _combinedTotal2;
          squares[_i2 - width].innerHTML = 0;
        }
      }
    }
  }; //swipe right


  var pushRight = function pushRight() {
    for (var i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        var totalOne = squares[i].innerHTML;
        var totalTwo = squares[i + 1].innerHTML;
        var totalThree = squares[i + 2].innerHTML;
        var totalFour = squares[i + 3].innerHTML;
        var row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        var filteredRow = row.filter(function (num) {
          return num;
        });
        var missing = 4 - filteredRow.length;
        var zeros = Array(missing).fill(0);
        var newRow = zeros.concat(filteredRow);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }; //swipe left


  var swipeLeft = function swipeLeft() {
    for (var i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        var totalOne = squares[i].innerHTML;
        var totalTwo = squares[i + 1].innerHTML;
        var totalThree = squares[i + 2].innerHTML;
        var totalFour = squares[i + 3].innerHTML;
        var row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        var filteredRow = row.filter(function (num) {
          return num;
        });
        var missing = 4 - filteredRow.length;
        var zeros = Array(missing).fill(0);
        var newRow = filteredRow.concat(zeros);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }; //swipe up


  var swipeUp = function swipeUp() {
    for (var i = 0; i < 4; i++) {
      var totalOne = squares[i].innerHTML;
      var totalTwo = squares[i + width].innerHTML;
      var totalThree = squares[i + width * 2].innerHTML;
      var totalFour = squares[i + width * 3].innerHTML;
      var column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      var filteredColumn = column.filter(function (num) {
        return num;
      });
      var missing = 4 - filteredColumn.length;
      var zeros = Array(missing).fill(0);
      var newColumn = filteredColumn.concat(zeros);
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }; //swipe up


  var swipeDown = function swipeDown() {
    for (var i = 0; i < 4; i++) {
      var totalOne = squares[i].innerHTML;
      var totalTwo = squares[i + width].innerHTML;
      var totalThree = squares[i + width * 2].innerHTML;
      var totalFour = squares[i + width * 3].innerHTML;
      var column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      var filteredColumn = column.filter(function (num) {
        return num;
      });
      var missing = 4 - filteredColumn.length;
      var zeros = Array(missing).fill(0);
      var newColumn = zeros.concat(filteredColumn);
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  };
  /* ---------------------------------------------------------------*/

  /* ------------------- STYLING -----------------------------------*/

  /* ---------------------------------------------------------------*/


  var swipRightStyle = function swipRightStyle(element) {
    element.classList.add("deuxMilles--swRight");
  };

  var styleSquares = function styleSquares(squares) {
    squares.forEach(function (element) {
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
  };
  /* ---------------------------------------------------------------- */

  /* ----------------- CONTROLS ------------------------------------- */

  /* ---------------------------------------------------------------- */


  var control = function control(event) {
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


  var getDivToMoveRight = function getDivToMoveRight(list) {
    var indexList = [];

    for (var i = 0; i < 15; i++) {
      if (i % 4 != 3 && list[i].innerText != 0 && list[i + 1].innerText == 0) {
        indexList.push(i);
      }
    }

    console.log("Index à bouger à droite : " + indexList);
    return indexList;
  };

  var getDivsToMerge = function getDivsToMerge(list) {
    var indexList = [];

    for (var i = 0; i < 15; i++) {
      if (i != 3 && i % 4 != 3 && list[i].innerText != 0 && list[i + 1].innerText === list[i].innerText) {
        indexList.push(i);
      }
    }

    console.log("Index à merger à droite : " + indexList);
    return indexList;
  }; // 0.2- On déplace visuellement les divs concernées vers la droite
  // d'une case et on met à jour l'ordre des squares sans afficher


  var moveDivsToTheRight = function moveDivsToTheRight(listIndex) {
    var info = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    listIndex.forEach(function (index) {
      squares[index].classList.add("deuxMilles--moveRight");
      console.log(squares[index]);

      if (!info) {
        squares[index].classList.add("deuxMilles--under");
      }
    });
  };

  var fillDivsRight = function fillDivsRight() {
    // On récupère l'index des divs à déplacer à droite
    var listIndexToMoveRight = getDivToMoveRight(squares); // On déplace visuellement les divs

    moveDivsToTheRight(listIndexToMoveRight); // On refait l'affichage après le temps d'animation

    setTimeout(function () {
      // On change les valeurs dans les divs
      squares = replaceElementInnerText(listIndexToMoveRight, squares); // on remet en place les divs

      removeClassMoveRight(); // On refait le style du tableau

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

  var mergeDivsRight = function mergeDivsRight() {
    // On identifie les cases ayant un nombre identique à leur droite
    var listDivsToMerge = getDivsToMerge(squares);
    console.log(listDivsToMerge.length);

    if (listDivsToMerge.length) {
      // On déplace visuellement les divs
      moveDivsToTheRight(listDivsToMerge);
      setTimeout(function () {
        // on affiche la somme des deux cases dans la case de droite,
        squares = replaceElementInnerText(listDivsToMerge, squares); // on remet en place les divs

        removeClassMoveRight(); // On refait le style du tableau

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

  var replaceElementInnerText = function replaceElementInnerText(listIndex, listOfElements) {
    // On remplace le contenu de l'élément i+1 par la somme i + (i+1)
    listIndex.forEach(function (index) {
      var nb1 = parseInt(listOfElements[index].innerHTML);
      var nb2 = parseInt(listOfElements[index + 1].innerHTML);
      nb2 += nb1;
      listOfElements[index].innerHTML = 0;
      listOfElements[index + 1].innerHTML = nb2;
    });
    console.log("Ok replaceElementInnerText");
    return listOfElements;
  };

  var removeClassMoveRight = function removeClassMoveRight() {
    var elementsWithClassToRemove = document.getElementsByClassName("deuxMilles--moveRight");

    while (elementsWithClassToRemove.length) {
      elementsWithClassToRemove.item(0).classList.remove("deuxMilles--moveRight");
      elementsWithClassToRemove = document.getElementsByClassName("deuxMilles--moveRight");
    }
  };

  var keyRight = function keyRight() {
    fillDivsRight();
    setTimeout(function () {
      mergeDivsRight();
      fillDivsRight();
      setTimeout(function () {
        mergeDivsRight();
        fillDivsRight();
        setTimeout(function () {
          mergeDivsRight();
          fillDivsRight();
          checkForWin();
          checkForGameOver();
          refreshScore();
        }, 120);
      }, 120);
    }, 120);
  };

  var keyLeft = function keyLeft() {
    swipeLeft();
    combineRow(squares, "left");
    swipeLeft();
    checkForWin();
    checkForGameOver();
    generateNumber(squares);
    refreshScore();
  };

  var keyUp = function keyUp() {
    swipeUp();
    combineColumn(squares, "up");
    swipeUp();
    checkForWin();
    checkForGameOver();
    generateNumber(squares);
    refreshScore();
  };

  var keyDown = function keyDown() {
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


  var checkForWin = function checkForWin() {
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "C Gagné !";
        document.removeEventListener("keyup", control);
        endGame();
      }
    }
  };

  var checkForGameOver = function checkForGameOver() {
    var compteur = 0;

    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) compteur++;
    }

    if (compteur === 0) {
      resultDisplay.innerHTML = "C Perdu";
      document.removeEventListener("keyup", control);
      endGame();
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

  createBoard();
  document.addEventListener("keyup", control);
});
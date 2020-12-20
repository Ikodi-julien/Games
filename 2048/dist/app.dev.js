"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var gridDisplay = document.querySelector(".grid");
  var scoreDisplay = document.getElementById("score");
  var resultDisplay = document.getElementById("result");
  var width = 4;
  var squares = [];
  var score = 0; // Create a playing board

  var createBoard = function createBoard() {
    for (var i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    generateNumber();
    generateNumber();
  }; // generate a number randomly


  var generateNumber = function generateNumber() {
    var randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerText == 0) {
      squares[randomNumber].innerText = 2;
    } else generateNumber();
  }; //swipe right


  var swipeRight = function swipeRight() {
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

  var combineRow = function combineRow() {
    for (var i = 0; i < squares.length; i++) {
      if (i % 4 !== 3 && squares[i].innerHTML == squares[i + 1].innerHTML) {
        var combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
      }
    }
  };

  var combineColumn = function combineColumn() {
    for (var i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        var combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
      }
    }
  };

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

  var keyRight = function keyRight() {
    swipeRight();
    combineRow();
    swipeRight();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };

  var keyLeft = function keyLeft() {
    swipeLeft();
    combineRow();
    swipeLeft();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };

  var keyUp = function keyUp() {
    swipeUp();
    combineColumn();
    swipeUp();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };

  var keyDown = function keyDown() {
    swipeDown();
    combineColumn();
    swipeDown();
    checkForWin();
    checkForGameOver();
    generateNumber();
  };

  var checkForWin = function checkForWin() {
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "C Gagné !";
        document.removeEventListener("keyup", control);
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
    }
  };

  createBoard();
  document.addEventListener("keyup", control);
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  /* --- SHOW MENU --- */
  function showMenu(hamburgerId, navId) {
    var hamburger = document.getElementById(hamburgerId),
        nav = document.getElementById(navId);

    if (hamburger && nav) {
      hamburger.addEventListener('click', function () {
        nav.classList.toggle('show');
      });
    }
  }

  showMenu('nav-hamburger', 'nav-menu');
  /* --- BURGER ANIMATION --- */

  var animBurger = document.getElementById('nav-hamburger');
  var menuOpen = false;
  animBurger.addEventListener('click', function () {
    if (!menuOpen) {
      animBurger.classList.add('open');
      menuOpen = true;
    } else {
      animBurger.classList.remove('open');
      menuOpen = false;
    }
  });
});
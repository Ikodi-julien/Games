document.addEventListener('DOMContentLoaded', () => {
  /* --- SHOW MENU --- */
  function showMenu(hamburgerId, navId) {
    const hamburger = document.getElementById(hamburgerId),
      nav = document.getElementById(navId)
    if (hamburger && nav) {
      hamburger.addEventListener('click', () => {
        nav.classList.toggle('show')
      })
    }
  }
  showMenu('nav-hamburger', 'nav-menu')

  /* --- BURGER ANIMATION --- */
  const animBurger = document.getElementById('nav-hamburger')
  let menuOpen = false
  animBurger.addEventListener('click', () => {
    if (!menuOpen) {
      animBurger.classList.add('open')
      menuOpen = true
    } else {
      animBurger.classList.remove('open')
      menuOpen = false
    }
  })
})

var memory = {
  plateau: document.getElementById('plateau'),
  affichageNbCoups: document.getElementById('nbCoups'),
  affichageNbPaires: document.getElementById('nbPaires'),
  compteurDeClic: 0,
  listeCartesDecouvertes: [],
  nombreDePairesTrouvees: 0,
}

function creerMemory() {
  // On créé une liste vide
  let listeDeCartes = []
  //
  for (let nbDeFois = 12; nbDeFois > 0; nbDeFois--) {
    // Faire des doubles de carte

    for (let repetition = 2; repetition > 0; repetition--) {
      // Créer une carte
      let carte = document.createElement('div')
      carte.classList.add('carte')

      carte.classList.add('carte__' + nbDeFois)

      // On cache la carte en créant une carte "dos de carte" par-dessus
      let dosDeCarte = document.createElement('div')
      dosDeCarte.classList.add('dos-carte')
      carte.appendChild(dosDeCarte)

      // On met la carte dans la liste
      listeDeCartes.push(carte)
    }
  }
  return listeDeCartes
}

// Mélanger la liste des cartes
function melangerCartes(listeCartes) {
  for (let indexCarte = listeCartes.length - 1; indexCarte >= 0; indexCarte--) {
    let nombreAuPif = Math.floor(Math.random() * listeCartes.length)
    let carteABouger = listeCartes[indexCarte]
    let carteRecuperee = listeCartes[nombreAuPif]
    listeCartes[nombreAuPif] = carteABouger
    listeCartes[indexCarte] = carteRecuperee
  }
  return listeCartes
}

// On met le contenu de la liste mélangée dans le plateau
function affichageMemory(listeCartes) {
  listeCartes.forEach((element) => {
    memory.plateau.appendChild(element)
  })
}

/**
 * Fonction qui compte combien de cartes on montre
 */

function cacherOuMontrerCarte(listeCartes) {
  // On ajoute la possibilité de faire disparaitre le cache en cliquant
  listeCartes.forEach((element) => {
    element.firstChild.addEventListener('click', () => {
      element.firstChild.className = 'dos-carte'
      element.firstChild.classList.add('transparent')
      // On ajoute la carte découverte dans une liste
      memory.listeCartesDecouvertes.push(element)

      // On controle si gagné ou non
      if (memory.listeCartesDecouvertes.length > 1) {
        memory.listeCartesDecouvertes = controlMemory(
          memory.listeCartesDecouvertes
        )
      }
    })
  })
  return listeCartes
}

function controlMemory(listeCartes) {
  // Vérifier si les cartes sont identiques
  if (listeCartes[0].classList.item(1) === listeCartes[1].classList.item(1)) {
    // Si elles sont identiques,
    // empécher de pouvoir à nouveau cliquer dessus,

    listeCartes[0].removeChild(listeCartes[0].firstChild)
    listeCartes[1].removeChild(listeCartes[1].firstChild)
    listeCartes = []
    // On affiche le nombre paires restantes
    memory.nombreDePairesTrouvees++
    memory.affichageNbPaires.textContent = 12 - memory.nombreDePairesTrouvees
    // On vérifie si gagner
    if (memory.affichageNbPaires.textContent == 0) {
      document.getElementsByClassName('gagner')[0].classList.add('showGagner')
    }
    // On met à jour le nombre de coups
    memory.compteurDeClic++
    memory.affichageNbCoups.textContent = memory.compteurDeClic
  } else {
    // Si elles sont différentes elles se reretournent

    listeCartes[0].firstChild.classList.remove('transparent')
    listeCartes[0].firstChild.classList.add('showBack')

    let oldCarte = listeCartes[1].firstChild
    setTimeout(() => {
      oldCarte.classList.add('showBack')
    }, 110)
    listeCartes = []
  }
  // On met à jour le nombre de coups

  memory.compteurDeClic++
  memory.affichageNbCoups.textContent = memory.compteurDeClic

  console.log(listeCartes)
  return listeCartes
}

function prepareMemory() {
  let listeCartes = creerMemory()
  let listeCartesMelangees = melangerCartes(listeCartes)
  affichageMemory(listeCartesMelangees)
  listeCartesMelangees = cacherOuMontrerCarte(listeCartesMelangees)
}

/*------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(prepareMemory, 300)
})

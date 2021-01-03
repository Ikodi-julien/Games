const endGame = (score) => {
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

export { endGame };

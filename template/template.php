<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="./app.js"></script>
    <link rel="stylesheet" href="../css/style.css" />
    <title>Ikodi-Games</title>
  </head>
  <body>

    <div class="gameContainer">

      <nav>
        <ul>
          <li><a href="../../">IKODI</a></li>
          <li><a href="../">Accueil Games</a></li>
        </ul>
      </nav>

      <?= $grid; ?>

      <div class="info">
        <?= $infos; ?>
      </div>

      <div class="result">
        <h2>Les meilleurs !</h2>
        <?= $scores; ?>
      </div>

      <div class="endGameBox">
      <div class="gameOverDisplay">GAME OVER</div>
        <label for="pseudo">Pseudo : 
          <input type="text" name="pseudo" id="pseudo" value="Régis">
        </label>
        <label for="comment">Un commentaire ?
          <input type="text" name="comment" id="comment" value="">
        </label>
      </div>

    </div>
  </body>

</html>

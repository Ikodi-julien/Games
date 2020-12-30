<?php
header("Cache-Control: no-cache, must-revalidate");

$js1 = '<script src="./app.js" type="module"></script>';
/* Connexion DataBase */
function loadClass($className) {
  require('../classes/'.$className.'.php');
}

spl_autoload_register('loadClass', true,);

$playerManager = new PlayerManager;

/* Enregistrement du score */
if (
  isset($_GET['score']) &&
  is_numeric($_GET['score']) &&
  isset($_GET['pseudo']) &&
  is_string($_GET['pseudo']) &&
  isset($_GET['comment']) &&
  is_string($_GET['comment'])
  ) {

    $data = [];
    $data['gameName'] = '2048';
    $data['pseudo'] =htmlspecialchars($_GET['pseudo']);
    $data['score'] = (int) htmlspecialchars($_GET['score']);
    $data['comment'] = htmlspecialchars($_GET['comment']);

    $playerManager->add(new Player($data));

    header('Location: index.php');

  }

/* Récupération des scores */
$rqScore = $playerManager->get2048Players();

$listScores = [];

ob_start();

while (($data = $rqScore->fetch(PDO::FETCH_ASSOC)) && (count($listScores) < 11)) {
  $newPlayer = new Player($data);

  if (!in_array($newPlayer->pseudo(), $listScores) ) {
    $listScores[] = $newPlayer->pseudo();
    echo $newPlayer->pseudo() . ' : ' . $newPlayer->score() . ' => '.$newPlayer->comment().'<br />';
  }
}

$scores = ob_get_clean();
ob_start();
?>




<div class=".container">
  <div class=".gameContainer">

    <div class="deuxMilles__score__container">
      <h3 class="deuxMilles__score__title">Score<span id="score">0</span></h3>
      
    </div>

    <div id="result"></div>

    
    <div class="deuxMilles__grid">
      <div class="deuxMilles__touchsurface" id="deuxMilles__touchsurface"></div>
    </div>

    <div class="deuxMilles__winner" id="deuxMilles__winner">

      <h1>GAGNÉ !</h1>
      <p>Clique ICI quand tu veux pour enregistrer ton score (arrête la partie)</p>

    </div>

  </div>
</div>




<?php
$grid = ob_get_clean();
$infos = '<p><strong>Atteindre 2048 pour gagner !</strong><br>
          Avec les flèches du clavier,<br>
          swipe sur smartphone,
          ;-)<br></p>';

require '../template/template.php';
?>


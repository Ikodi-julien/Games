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
    $data['gameName'] = 'doodleJump';
    $data['pseudo'] =htmlspecialchars($_GET['pseudo']);
    $data['score'] = (int) htmlspecialchars($_GET['score']);
    $data['comment'] = htmlspecialchars($_GET['comment']);

    $playerManager->add(new Player($data));

    header('Location: index.php');

  }

/* Récupération des scores */
$rqScore = $playerManager->getDoodlePlayers();

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

<div class="doodleGrid">
  <button id="startButton">START</button>
  <div class="doodleControls">
    <button id="left"><-</button>
    <button id="straight"><></button>
    <button id="right">-></button>
  </div>
</div>

<?php
$grid = ob_get_clean();
$infos = '<p>Pour se diriger : soit les flèches du clavier
    (flèche du haut pour s\'immobiliser), ou alors les boutons ci-dessus :-)</p>
';

require '../template/template.php';
?>
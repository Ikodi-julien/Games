<?php
header("Cache-Control: no-cache, must-revalidate");

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
    $data['gameName'] = 'snake';
    $data['pseudo'] =htmlspecialchars($_GET['pseudo']);
    $data['score'] = (int) htmlspecialchars($_GET['score']);
    $data['comment'] = htmlspecialchars($_GET['comment']);

    $playerManager->add(new Player($data));

    header('Location: index.php');

  }

/* Récupération des scores */
$rqScore = $playerManager->getSnakePlayers();
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

/* Récup de snakeGrid */

ob_start();
?>
<h3>SNAKE (du Nokia 3310)</h3>


<div class="snakeScore">
  <p>Score : <span>0</span></p>
  <button class="start">Start</button>
</div>

<div class="snakeGrid">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<div class="snakeControl">
  <div class="snakeControl__box"></div>
  <div class="snakeControl__box direction" id="snakeUp"></div>
  <div class="snakeControl__box "></div>
  <div class="snakeControl__box direction" id="snakeLeft"></div>
  <div class="snakeControl__box "></div>
  <div class="snakeControl__box direction" id="snakeRight"></div>
  <div class="snakeControl__box "></div>
  <div class="snakeControl__box direction" id="snakeDown"></div>
  <div class="snakeControl__box "></div>
</div>

<?php
$grid = ob_get_clean();
$infos = '<p>Pour se diriger : soit les flèches du clavier 
ou alors les boutons ci-dessus :-)</p>
';

require '../template/template.php';
?>
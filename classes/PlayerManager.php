<?php

class PlayerManager extends DBConnexion {

  public function add(Player $player) {

    $rqInsertPlayer = $this->db->prepare(
      'INSERT INTO player(gameName, pseudo, score, comment)
      VALUES(:gameName,:pseudo, :score, :comment)'
    );

    try {
      $rqInsertPlayer->execute(array(
        ':gameName' => $player->gameName(),
        ':pseudo' => $player->pseudo(),
        ':score' => $player->score(),
        ':comment' => $player->comment()
      ));
    }
    catch (Exception $e) {
      die('Erreur dans PlayerManager->add() :'.$e->getMessage());
    }
  }

  public function getDoodlePlayers() {
    try {
      $rqDoodle = $this->db->query(
        'SELECT * FROM player WHERE gameName="doodleJump" ORDER BY score DESC'
        );
      }
    catch (Exception $e) {
      die('Erreur dans PlayerManager->getDoodleJumpPlayers() :'.$e->getMessage());
    }
    return $rqDoodle;
  }

  public function getSnakePlayers() {
    try {
      $rqSnake = $this->db->query(
        'SELECT * FROM player WHERE gameName="snake" ORDER BY score DESC'
        );
      }
    catch (Exception $e) {
      die('Erreur dans PlayerManager->getSnakePlayers() :'.$e->getMessage());
    }
    return $rqSnake;
  }

  public function getFbPlayers() {
    try {
      $rqFb = $this->db->query(
        'SELECT * FROM player WHERE gameName="fb" ORDER BY score DESC'
        );
      }
    catch (Exception $e) {
      die('Erreur dans PlayerManager->getFbPlayers() :'.$e->getMessage());
    }
    return $rqFb;
  }
}
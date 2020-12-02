import React from 'react';
import playerFactory from '../factories/player';
import GameboardDisplay from './gameboardDisplay';

function Game() {
  const player1 = playerFactory();
  const player2 = playerFactory();

  player1.getGameboard().placeShip('carrier', 'vertical', 'C2');
  player1.getGameboard().placeShip('battleship', 'horizontal', 'G5');
  player1.getGameboard().placeShip('cruiser', 'vertical', 'A7');
  player1.getGameboard().placeShip('submarine', 'horizontal', 'I3');
  player1.getGameboard().placeShip('destroyer', 'vertical', 'A4');

  player2.getGameboard().placeShip('carrier', 'vertical', 'A2');
  player2.getGameboard().placeShip('battleship', 'vertical', 'D8');
  player2.getGameboard().placeShip('cruiser', 'horizontal', 'B4');
  player2.getGameboard().placeShip('submarine', 'horizontal', 'J2');
  player2.getGameboard().placeShip('destroyer', 'vertical', 'A9');

  return (
    <div>
      <GameboardDisplay board={player1.getGameboard().getGrid()} />
      <br />
      <GameboardDisplay board={player2.getGameboard().getGrid()} />
    </div>
  );
}

export default Game;

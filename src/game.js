import { ORIENTATION } from './factories/gameboard';
import Player from './player';

const Game = () => {
  const player1 = Player();
  const player2 = Player();

  /**
   * Sets up the platers and game boards.
   *
   * For now, this sets ships at predetermined coordinates.
   */
  const initialize = () => {
    player1.board.placeShip('carrier', 'B3', ORIENTATION.vertical);
    player1.board.placeShip('battleship', 'B6', ORIENTATION.horizontal);
    player1.board.placeShip('cruiser', 'J2', ORIENTATION.horizontal);
    player1.board.placeShip('destroyer', 'A10', ORIENTATION.vertical);
    player1.board.placeShip('destroyer', 'F10', ORIENTATION.vertical);

    player2.board.placeShip('carrier', 'E2', ORIENTATION.horizontal);
    player2.board.placeShip('battleship', 'B9', ORIENTATION.vertical);
    player2.board.placeShip('cruiser', 'J1', ORIENTATION.horizontal);
    player2.board.placeShip('destroyer', 'F6', ORIENTATION.vertical);
    player2.board.placeShip('destroyer', 'H1', ORIENTATION.horizontal);
  };

  /**
   * The primary game loop.
   */
  const loop = () => {
    while (!player1.allShipsSunk() && !player2.allShipsSunk()) {
      player1.attackRandom(player2);
      player2.attackRandom(player1);
    }
  };

  return { initialize, loop };
};

export default Game;

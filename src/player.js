import gameboardFactory from './factories/gameboard';

const Player = () => {
  const board = gameboardFactory();

  /**
   * Attacks another player's board at the given point.
   *
   * @param {Player} target The player to attack.
   * @param {string} coordinate The board location to attack.
   */
  const attack = (target, coordinate) => {
    target.board.receiveAttack(coordinate);
  };

  /**
   * Attacks a random point on another player's board.
   *
   * @param {Player} target The player to attack.
   * @returns {string} the random coordinate that was attacked.
   */
  const attackRandom = (target) => {
    const rows = 'ABCDEFGHIJ';
    const row = rows.charAt(Math.floor(Math.random() * rows.length));
    const col = Math.floor(Math.random() * 10).toString();
    const coordinate = row.toString() + col;

    attack(target, coordinate);
    return coordinate;
  };

  /**
   * Determines whether all of the player's ships have been sunk.
   *
   * @returns true if all ships have been sunk, false otherwise.
   */
  const allShipsSunk = () => {
    let allSunk = true;

    board.getShips().forEach((ship) => {
      if (!ship.isSunk()) {
        allSunk = false;
      }
    });
    return allSunk;
  };

  return { attack, attackRandom, allShipsSunk, board };
};

export default Player;

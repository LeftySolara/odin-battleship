import gameboardFactory from './factories/gameboard';

const Player = () => {
  const board = gameboardFactory();

  /**
   * Attacks another player's board at the given point.
   *
   * @param {Player} target The player to attack.
   * @param {string} row The row of the attack point.
   * @param {string} col The column of the attack point.
   */
  const attack = (target, row, col) => {
    target.board.receiveAttack(row, col);
  };

  /**
   * Attacks a random point on another player's board.
   *
   * @param {Player} target The player to attack.
   * @returns the random point that was attacked.
   */
  const attackRandom = (target) => {
    const rows = 'ABCDEFGHIJ';
    const row = rows.charAt(Math.floor(Math.random() * rows.length));
    const col = Math.floor(Math.random() * 10).toString();

    attack(target, row, col);
    return [row, col];
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

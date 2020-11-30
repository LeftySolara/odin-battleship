import gameboardFactory from './gameboard';

const playerFactory = () => {
  const gameboard = gameboardFactory();
  const getGameboard = () => gameboard;

  /**
   * Sends an attack to the specified player's board.
   *
   * @param {object} player The player to attack.
   * @param {string} tile The tile to target on the player's board.
   * @returns {bool} True if the attack was successful, false otherwise.
   */
  const attackEnemy = (player, tile) =>
    player.getGameboard().receiveAttack(tile);

  /**
   * Generates a random integer between min and max (inclusive).
   *
   * @param {number} min The minimum value to generate.
   * @param {number} max The maximum value to generate.
   * @returns {number} An integer between min and max (inclusive).
   */
  const getRandomInt = (min, max) => {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  };

  /**
   * Chooses a random gameboard tile.
   * @returns {string} A gameboard tile identifier.
   */
  const chooseRandomTile = () => {
    const column = getRandomInt(1, 10);
    const row = getRandomInt(65, 74);

    return String.fromCharCode(row) + column;
  };

  return { attackEnemy, chooseRandomTile, getGameboard };
};

export default playerFactory;

import shipFactory from './ship';

const gameboardFactory = () => {
  let nextShipID = 0;
  const fleet = [];

  const grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  /**
   * Gets a ship based on its ID.
   */
  const getShip = (id) => {
    return fleet.find((ship) => ship.id === id);
  };

  /**
   * Returns an array of all ships on the board.
   */
  const getShips = () => fleet;

  /**
   * Returns the board array.
   */
  const getGrid = () => grid;

  /**
   * Determintes if a coordinate is a valid position on the board.
   *
   * @param {string} coordinate The coordinate to test.
   * @returns {bool} True if the coordinate is a valid board position, false otherwise.
   */
  const isValidCoordinate = (coordinate) => {
    return /^[A-J]([1-9]|1[0])$/i.test(coordinate);
  };

  /**
   * Determines if a given orientation is valid.
   *
   * @param {string} orientation The orientation to test.
   * @returns {bool} True if orientation if valid, false otherwise.
   */
  const isValidOrientation = (orientation) => {
    return (
      orientation.toLowerCase() === 'vertical' ||
      orientation.toLowerCase() === 'horizontal'
    );
  };

  /**
   * Converts a board coordinate into intergers for use as array indexes.
   *
   * @param {string} coordinate The corrdinate to convert.
   * @returns {Object} The grid indexes.
   */
  const coordinateToGridIndex = (coordinate) => {
    if (!isValidCoordinate(coordinate)) {
      return null;
    }
    const column = parseInt(coordinate.substring(1), 10) - 1;
    const row = coordinate.charAt(0).toUpperCase().charCodeAt(0) - 65;

    return { column, row };
  };

  /**
   * Checks if a ship placed at the givin origin will overlap with another ship or the board boundary.
   *
   * @param {string} origin The origin point of the ship.
   * @param {string} orientation The direction to rotate the ship. Can be either "vertical" or "horizontal".
   * @param {number} shipLength The length of the ship.
   * @returns {bool} True if ship will overlap with another, false otherwise.
   */
  const shipWillOverlap = (origin, orientation, shipLength) => {
    const originIndex = coordinateToGridIndex(origin);

    // Check for board border.
    if (orientation === 'vertical') {
      if (originIndex.row + shipLength >= 10) {
        return true;
      }
    } else if (orientation === 'horizontal') {
      if (originIndex.column + shipLength >= 10) {
        return true;
      }
    }

    // Check for other ships.
    if (orientation === 'vertical') {
      for (let i = 0; i < shipLength; i += 1) {
        if (grid[originIndex.row + i][originIndex.column] !== null) {
          return true;
        }
      }
    } else if (orientation === 'horizontal') {
      for (let i = 0; i < shipLength; i += 1) {
        if (grid[originIndex.row][originIndex.column + i] !== null) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Places a ship at the specified position on the board.
   *
   * If the ship type or coordinate are invald, this function does nothing.
   *
   * @param {string} shipType The type of ship to place.
   * @param {string} orientation The direction to rotate the ship. Can be either "vertical" or "horizontal".
   * @param {string} coordinate The position on the board to place the ship.
   */
  const placeShip = (shipType, orientation, coordinate) => {
    if (!isValidOrientation(orientation) || !isValidCoordinate(coordinate)) {
      return;
    }
    const ship = shipFactory(shipType);
    if (
      ship === null ||
      shipWillOverlap(coordinate, orientation, ship.getLength())
    ) {
      return;
    }
    const shipID = nextShipID;
    nextShipID += 1;

    const origin = coordinateToGridIndex(coordinate);
    if (orientation === 'vertical') {
      for (let i = 0; i < ship.getLength(); i += 1) {
        grid[origin.row + i][origin.column] = shipID;
      }
    } else if (orientation === 'horizontal') {
      for (let i = 0; i < ship.getLength(); i += 1) {
        grid[origin.row][origin.column + i] = shipID;
      }
    }
    fleet.push({ ship, orientation, id: shipID, origin: coordinate });
  };

  /**
   * Gets the value of the board tile at the given coordinate.
   *
   * @param {number} coordinate The board position to check.
   * @returns {number} The id of the ship at the tile, -1 if tile is a missed attack, or null if no ship is present.
   */
  const getTile = (coordinate) => {
    if (!isValidCoordinate(coordinate)) {
      return null;
    }
    const gridIndex = coordinateToGridIndex(coordinate);
    return grid[gridIndex.row][gridIndex.column];
  };

  /**
   * Gets the offset between two coordinates.
   *
   * @param {string} origin The origin coordinate.
   * @param {string} target The coordinate to compare the origin to.
   * @param {string} orientation The direction of the offset.
   */
  const getOffset = (origin, target, orientation) => {
    const originIndex = coordinateToGridIndex(origin);
    const targetIndex = coordinateToGridIndex(target);

    let offset;
    if (orientation === 'vertical') {
      offset = targetIndex.row - originIndex.row;
    } else if (orientation === 'horizontal') {
      offset = targetIndex.column - originIndex.column;
    }

    return offset;
  };

  /**
   * Sends an attack to the given coordinate.
   *
   * @param {string} coordinate
   * @returns True if the attack succeeded, false otherwise.
   */
  const receiveAttack = (coordinate) => {
    if (!isValidCoordinate(coordinate)) {
      throw RangeError('Invalid coordinate');
    }
    const targetID = getTile(coordinate);

    // Attack missed
    if (targetID === null) {
      const gridIndex = coordinateToGridIndex(coordinate);
      grid[gridIndex.row][gridIndex.column] = -1;
      return false;
    }
    // Tile already registered as missed attack
    if (targetID === -1) {
      return false;
    }

    const target = getShip(targetID);
    const offset = getOffset(target.origin, coordinate, target.orientation);

    target.ship.hit(offset);

    return true;
  };

  /**
   * Checks if all ships in the fleet have been sunk.
   */
  const allShipsSunk = () => {
    return !fleet.find((target) => target.ship.isSunk() === false);
  };

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    getTile,
    getShip,
    getShips,
    getGrid,
  };
};

export default gameboardFactory;

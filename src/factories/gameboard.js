import shipFactory from './ship';

/**
 * A gameboard coordinate represented as array indexes.
 *
 * @typedef {object} Point
 * @property row {number} The row number in the grid.
 * @property col {number} The column number in the grid.
 *
 * @param {string} coordinate The coordinate on the game board.
 */
const Point = (coordinate) => {
  const row = coordinate.slice(0, 1).toUpperCase().charCodeAt(0) - 65;
  const col = parseInt(coordinate.slice(1), 10) - 1;

  return { row, col };
};

/**
 * Possible orientations for placing ships.
 *
 * @enum {Number}
 * @readonly
 */
const ORIENTATION = {
  horizontal: 0,
  vertical: 1,
};

/**
 * Possible states for a board tile.
 *
 * Hidden: the tile has not been interacted with.
 * Hit: the tile contains a ship and been targeted by an attack.
 * Missed: the tile does not contain a ship and has been targeted by an attack.
 */
const TILE_STATES = {
  hidden: 0,
  hit: 1,
  missed: 2,
  out_of_bounds: 3,
};

/**
 * Creates a new gameboard object.
 */
const gameboardFactory = () => {
  const grid = [];
  const ships = [];
  let nextShipID = 0;

  /**
   * Creates the grid and fills it with empty tiles.
   */
  const initialize = () => {
    for (let rowIndex = 0; rowIndex < 10; ++rowIndex) {
      const row = [];

      for (let colIndex = 0; colIndex < 10; ++colIndex) {
        row.push({
          state: TILE_STATES.hidden,
          shipID: null,
          shipPosition: null,
        });
      }
      grid.push(row);
    }
  };

  /**
   * Determines if the given coordinate exists on the board.
   *
   * @param {string} coordinate The coordinate on the board to check.
   */
  const isValidCoordinate = (coordinate) => {
    const point = Point(coordinate);
    return point.row >= 0 && point.row <= 9 && point.col >= 0 && point.col <= 9;
  };

  /**
   * Checkes whether the placement of a ship will overlap another ship or the grid border.
   *
   * @param {string} shipLength The length of the ship.
   * @param {string} coordinate The coordinate of the ship's origin point.
   * @param {ORIENTATION} orientation The orientation of the ship's placement.
   *
   * @returns {bool} True if the ship will overlap, false otherwise.
   */
  const shipWillOverlap = (shipLength, coordinate, orientation) => {
    const origin = Point(coordinate);

    // Check for grid border.
    if (
      orientation === ORIENTATION.vertical &&
      origin.row + shipLength >= grid.length
    ) {
      return true;
    }
    if (origin.col + shipLength >= grid.length) {
      return true;
    }

    // Check for other ships.
    if (orientation === ORIENTATION.vertical) {
      for (let i = 0; i < shipLength; ++i) {
        if (grid[origin.row + i][origin.col].shipID !== null) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < shipLength; ++i) {
        if (grid[origin.row][origin.col + i].shipID !== null) {
          return true;
        }
      }
    }

    return false;
  };

  /**
   * Places a ship at the given coordinate on the board.
   *
   * @param {string} shipType The type of ship to place.
   * @param {string} coordinate The board coordinate to place the ship's origin point.
   * @param {ORIENTATION} orientation The direction the ship should point when placed.
   *
   * @returns {bool} True if the ship is placed successfully, false otherwise.
   */
  const placeShip = (shipType, coordinate, orientation) => {
    if (!isValidCoordinate(coordinate)) {
      return false;
    }

    const ship = shipFactory(shipType, nextShipID);
    if (shipWillOverlap(ship.getLength(), coordinate, orientation)) {
      return false;
    }

    const origin = Point(coordinate);
    if (orientation === ORIENTATION.vertical) {
      for (let i = 0; i < ship.getLength(); ++i) {
        grid[origin.row + i][origin.col].shipID = nextShipID;
        grid[origin.row + i][origin.col].shipPosition = i;
      }
    } else {
      for (let i = 0; i < ship.getLength(); ++i) {
        grid[origin.row][origin.col + i].shipID = nextShipID;
        grid[origin.row][origin.col + i].shipPosition = i;
      }
    }

    ships.push(ship);
    ++nextShipID;
    return true;
  };

  /**
   * Checks whether a board tile has a ship placed on it.
   *
   * @param {string} coordinate The coordinate to check.
   * @returns {bool} True if the tile has a ship, false otherwise.
   */
  const tileHasShip = (coordinate) => {
    const point = Point(coordinate);
    return (
      isValidCoordinate(coordinate) &&
      grid[point.row][point.col].shipID !== null
    );
  };

  /**
   * @param {string} coordinate The place on the board to attack.
   */
  const receiveAttack = (coordinate) => {
    if (!isValidCoordinate(coordinate)) {
      return;
    }

    const point = Point(coordinate);

    if (!tileHasShip(coordinate)) {
      grid[point.row][point.col].state = TILE_STATES.missed;
      return;
    }
    grid[point.row][point.col].state = TILE_STATES.hit;

    const shipIndex = ships.findIndex(
      (ship) => ship.id === grid[point.row][point.col].shipID,
    );
    ships[shipIndex].hit(grid[point.row][point.col].shipPosition);
  };

  /**
   *
   * @param {string} coordinate The place on the board to check.
   * @returns {number} 0 if the tile is hidden, 1 if it is hit, or 2 if it has been missed.
   */
  const getTileState = (coordinate) => {
    if (!isValidCoordinate(coordinate)) {
      return TILE_STATES.out_of_bounds;
    }

    const point = Point(coordinate);
    return grid[point.row][point.col].state;
  };

  const getShip = (id) => ships.find((ship) => ship.id === id);
  const getShips = () => ships;

  initialize();
  return {
    placeShip,
    tileHasShip,
    receiveAttack,
    getTileState,
    getShip,
    getShips,
  };
};

export { gameboardFactory as default, TILE_STATES, ORIENTATION };

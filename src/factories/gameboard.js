import shipFactory from './ship';

/**
 * @typedef {object} Point
 * @property row {number} The row number in the grid.
 * @property col {number} The column number in the grid.
 */

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
   * Converts a grid coordinate into array indices.
   *
   * @param {string} row The row name of the coordinate.
   * @param {string} col The column number of the coordinate.
   * @returns {Point} An object containing the array indices for the coordinate.
   */
  const coordinateToIndex = (row, col) => {
    const rowIndex = row.toUpperCase().charCodeAt(0) - 65;
    const colIndex = parseInt(col, 10) - 1;

    return { row: rowIndex, col: colIndex };
  };

  /**
   * Determines if the given coordinate exists on the board.
   *
   * @param {string} row The row on the board.
   * @param {string} col The column on the board.
   */
  const isValidCoordinate = (row, col) => {
    const point = coordinateToIndex(row, col);
    return point.row >= 0 && point.row <= 9 && point.col >= 0 && point.col <= 9;
  };

  /**
   * Checkes whether the placement of a ship will overlap another ship or the grid border.
   *
   * @param {string} shipLength The length of the ship.
   * @param {string} row The row number of the ship's origin point.
   * @param {string} col The column number of the ship's origin point.
   * @param {ORIENTATION} orientation The orientation of the ship's placement.
   *
   * @returns {bool} True if the ship will overlap, false otherwise.
   */
  const shipWillOverlap = (shipLength, row, col, orientation) => {
    const point = coordinateToIndex(row, col);

    // Check for grid border.
    if (
      orientation === ORIENTATION.vertical &&
      point.row + shipLength >= grid.length
    ) {
      return true;
    }
    if (point.col + shipLength >= grid.length) {
      return true;
    }

    // Check for other ships.
    if (orientation === ORIENTATION.vertical) {
      for (let i = 0; i < shipLength; ++i) {
        if (grid[point.row + i][point.col].shipID !== null) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < shipLength; ++i) {
        if (grid[point.row][point.col + i].shipID !== null) {
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
   * @param {string} row The row on the board to place the ship.
   * @param {string} col The column on the board to place the ship.
   * @param {ORIENTATION} orientation The direction the ship should point when placed.
   *
   * @returns {bool} True if the ship is placed successfully, false otherwise.
   */
  const placeShip = (shipType, row, col, orientation) => {
    if (!isValidCoordinate(row, col)) {
      return false;
    }

    const ship = shipFactory(shipType, nextShipID);
    if (shipWillOverlap(ship.getLength(), row, col, orientation)) {
      return false;
    }

    const point = coordinateToIndex(row, col);
    if (orientation === ORIENTATION.vertical) {
      for (let i = 0; i < ship.getLength(); ++i) {
        grid[point.row + i][point.col].shipID = nextShipID;
        grid[point.row + i][point.col].shipPosition = i;
      }
    } else {
      for (let i = 0; i < ship.getLength(); ++i) {
        grid[point.row][point.col + i].shipID = nextShipID;
        grid[point.row][point.col + i].shipPosition = i;
      }
    }

    ships.push(ship);
    ++nextShipID;
    return true;
  };

  /**
   * Checks whether a board tile has a ship placed on it.
   *
   * @param {string} row The row to check.
   * @param {string} col The column to check.
   *
   * @returns {bool} True if the tile has a ship, false otherwise.
   */
  const tileHasShip = (row, col) => {
    const point = coordinateToIndex(row, col);
    return (
      isValidCoordinate(row, col) && grid[point.row][point.col].shipID !== null
    );
  };

  /**
   *
   * @param {string} row The row of the tile being hit.
   * @param {string} col The column of the tile being hit.
   */
  const receiveAttack = (row, col) => {
    if (!isValidCoordinate(row, col)) {
      return;
    }

    const point = coordinateToIndex(row, col);

    if (!tileHasShip(row, col)) {
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
   * @param {string} row The row of the requested tile.
   * @param {string} col The column of the requested tile.
   * @returns {number} 0 if the tile is hidden, 1 if it is hit, or 2 if it has been missed.
   */
  const getTileState = (row, col) => {
    if (!isValidCoordinate(row, col)) {
      return TILE_STATES.out_of_bounds;
    }

    const point = coordinateToIndex(row, col);
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

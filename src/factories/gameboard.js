import shipFactory from './ship';

/**
 * Creates a new gameboard object.
 */
const gameboardFactory = () => {
  const grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));

  /**
   * Determines if the given coordinate exists on the board.
   *
   * @param {string} row The row on the board.
   * @param {string} col The column on the board.
   */
  const isValidCoordinate = (row, col) => {
    const rowAscii = row.toUpperCase().charCodeAt(0);
    return rowAscii >= 65 && rowAscii <= 74 && col >= 1 && col <= 10;
  };

  /**
   * Checkes whether the placement of a ship will overlap another ship or the grid border.
   *
   * @param {string} shipLength The length of the ship.
   * @param {string} row The row number of the ship's origin point.
   * @param {string} col The column number of the ship's origin point.
   * @param {bool} vertical Whether the ship would be placed vertically.
   *
   * @returns {bool} True if the ship will overlap, false otherwise.
   */
  const shipWillOverlap = (shipLength, row, col, vertical) => {
    const rowNumber = row.toUpperCase().charCodeAt(0) - 65;
    const colNumber = parseInt(col, 10) - 1;

    // Check for grid border.
    if (vertical && rowNumber + shipLength >= grid.length) {
      return true;
    }
    if (colNumber + shipLength >= grid.length) {
      return true;
    }

    // Check for other ships.
    if (vertical) {
      for (let i = 0; i < shipLength; ++i) {
        if (grid[rowNumber + i][colNumber] !== null) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < shipLength; ++i) {
        if (grid[rowNumber][colNumber + i] !== null) {
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
   * @param {bool} vertical If true, the ship is placed vertically on the board, pointing downward from the origin point.
   *
   * @returns {bool} True if the ship is placed successfully, false otherwise.
   */
  const placeShip = (shipType, row, col, vertical = false) => {
    if (!isValidCoordinate(row, col)) {
      return false;
    }

    const ship = shipFactory(shipType);
    if (shipWillOverlap(ship.getLength(), row, col, vertical)) {
      return false;
    }

    const rowNumber = row.toUpperCase().charCodeAt(0) - 65;
    const colNumber = parseInt(col, 10) - 1;

    if (vertical) {
      for (let i = 0; i < ship.getLength(); ++i) {
        grid[rowNumber + i][colNumber] = true;
      }
    } else {
      for (let i = 0; i < ship.getLength(); ++i) {
        grid[rowNumber][colNumber + i] = true;
      }
    }

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
    const rowNumber = row.toUpperCase().charCodeAt(0) - 65;
    const colNumber = parseInt(col, 10) - 1;
    return isValidCoordinate(row, col) && grid[rowNumber][colNumber] !== null;
  };

  return { placeShip, tileHasShip };
};

export default gameboardFactory;

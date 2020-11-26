import createShip from './ship';

const createGameboard = () => {
  function createGrid() {
    const columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const grid = Array(columnNames.length);

    for (let i = 0; i < grid.length; i += 1) {
      grid[i] = Array(grid.length);
    }
    for (let row = 0; row < grid.length; row += 1) {
      for (let column = 0; column < grid.length; column += 1) {
        grid[row][column] = {
          coordinate: columnNames[column] + row,
          ship: null,
          shipLocation: null,
        };
      }
    }
    return grid;
  }

  /**
   * Places a ship of the specified type at the given coordinate.
   *
   * @param {string} shipType The type of ship to add to the board.
   * @param {string} orientation Whether the ship should be placed vertically or horizontally.
   * @param {string} coordinate The place on the board to place the ship.
   * @param {array} shipArray The list of ships to add the newly-created ship to.
   */
  function placeShip(shipType, orientation, coordinate, shipArray) {
    const column = coordinate.charAt(0);
    const row = parseInt(coordinate.substring(1), 10);

    if (!/^[A-J]$/i.test(column)) {
      throw RangeError('Invalid coordinate');
    }
    if (Number.isNaN(row) || row <= 0 || row > 10) {
      throw RangeError('Invalid coordinate');
    }

    const ship = createShip(shipType);
    const coordinates = [];

    if (orientation === 'vertical') {
      for (let i = 0; i < ship.getLength(); i += 1) {
        const coord = column + (row + i);
        coordinates.push(coord);
      }
    }
    /* else if (orientation === 'horizontal') {} */

    const shipInfo = {
      ship,
      id: shipArray.length,
    };

    shipArray.push(shipInfo);
  }

  function getTile(coordinate) {

  }

  const ships = [];
  const grid = createGrid();

  return { placeShip, getTile, ships };
};

export default createGameboard;

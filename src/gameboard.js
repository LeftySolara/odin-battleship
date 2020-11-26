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

  function createShips() {
    const ships = Array(5);
    Object.seal(ships);

    const shipTypes = ['destroyer', 'submarine', 'cruiser', 'battleship', 'carrier'];
    for (let i = 0; i < ships.length; i += 1) {
      const ship = createShip(shipTypes[i]);
      ships.push(ship);
    }
    return ships;
  }

  this.grid = createGrid();
  this.ships = createShips();
};

export default createGameboard;

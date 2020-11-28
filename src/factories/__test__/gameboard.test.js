import { beforeEach, describe, expect, test } from '@jest/globals';
import gameboardFactory from '../gameboard';

describe('Gameboard factory', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = gameboardFactory();
  });

  describe('when placing ships', () => {
    test('should be able to place ships at specific coordinates', () => {
      gameboard.placeShip('cruiser', 'vertical', 'B1');
      expect(gameboard.getTile('B1')).toBe(0);
      expect(gameboard.getTile('C1')).toBe(0);
      expect(gameboard.getTile('D1')).toBe(0);
      expect(gameboard.getTile('E1')).toBe(null);

      gameboard.placeShip('cruiser', 'horizontal', 'D3');
      expect(gameboard.getTile('D3')).toBe(1);
      expect(gameboard.getTile('D4')).toBe(1);
      expect(gameboard.getTile('D5')).toBe(1);
      expect(gameboard.getTile('D6')).toBe(null);
    });

    test('should do nothing when given invalid coordinates', () => {
      gameboard.placeShip('cruiser', 'vertical', 'B12');
      gameboard.placeShip('cruiser', 'vertical', 'B0');
      gameboard.placeShip('cruiser', 'vertical', 'K2');
      expect(gameboard.getShips()).toHaveLength(0);
    });

    test('should do nothing when given an invalid orientation', () => {
      gameboard.placeShip('cruiser', 'abc', 'B1');
      gameboard.placeShip('cruiser', '', 'B1');
      expect(gameboard.getShips()).toHaveLength(0);
    });

    test('should not allow placing over another ship', () => {
      gameboard.placeShip('cruiser', 'horizontal', 'B1');
      const shipCount = gameboard.getShips().length;

      // Placing new ship at same origin point.
      gameboard.placeShip('cruiser', 'vertical', 'B1');
      expect(gameboard.getShips().length).toBe(shipCount);

      // Placing new ship at different origin, but with an overlapping tile.
      gameboard.placeShip('cruiser', 'vertical', 'A2');
      expect(gameboard.getShips().length).toBe(shipCount);
    });

    test('should now allow placing if ship will extend past board boundaries', () => {
      gameboard.placeShip('cruiser', 'vertical', 'I1');
      expect(gameboard.getShips().length).toBe(0);
    });
  });

  describe('when a player attacks', () => {
    beforeEach(() => {
      gameboard.placeShip('cruiser', 'vertical', 'B1');
      gameboard.placeShip('battleship', 'horizontal', 'D3');
    });

    test('should throw if attack position is outside of board boundaries', () => {
      expect(() => {
        gameboard.receiveAttack('');
      }).toThrowError(RangeError);

      expect(() => {
        gameboard.receiveAttack('B0');
      }).toThrowError(RangeError);

      expect(() => {
        gameboard.receiveAttack('K2');
      }).toThrowError(RangeError);
    });

    test('should determine if a ship was hit or missed', () => {
      expect(gameboard.receiveAttack('B1')).toBe(true);
      expect(gameboard.receiveAttack('D3')).toBe(true);
      expect(gameboard.receiveAttack('J8')).toBe(false);
    });

    test('should send hit function to correct ship', () => {
      gameboard.receiveAttack('B1');
      expect(gameboard.getShip(0).ship.getHits()).toStrictEqual([
        true,
        false,
        false,
      ]);
      gameboard.receiveAttack('C1');
      expect(gameboard.getShip(0).ship.getHits()).toStrictEqual([
        true,
        true,
        false,
      ]);
      expect(gameboard.getShip(1).ship.getHits()).toContain(false);
    });

    test('should record missed shots', () => {
      gameboard.receiveAttack('F7');
      expect(gameboard.getTile('F7')).toBe(-1);
    });
  });

  describe('after each round', () => {
    beforeEach(() => {
      gameboard.placeShip('cruiser', 'vertical', 'B1');
      gameboard.placeShip('battleship', 'horizontal', 'D3');
    });

    test('should report whether or not all ships have been sunk', () => {
      expect(gameboard.allShipsSunk()).toBe(false);

      // Sink one ship, but not both.
      gameboard.receiveAttack('B1');
      gameboard.receiveAttack('C1');
      gameboard.receiveAttack('D1');
      expect(gameboard.allShipsSunk()).toBe(false);

      // Sink final ship.
      gameboard.receiveAttack('D3');
      gameboard.receiveAttack('D4');
      gameboard.receiveAttack('D5');
      gameboard.receiveAttack('D6');
      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });
});

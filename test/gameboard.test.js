import { describe, expect, test } from '@jest/globals';
import createGameboard from '../src/gameboard';

describe('Gameboard factory', () => {
  describe('when placing ships', () => {
    test('should be able to place ships at specific coordinates', () => {
      const board = createGameboard();
      board.placeShip('cruiser', 'vertical', 'B1');
      expect(board.getTile('B1')).toBe(['cruiser', 0]);
      expect(board.getTile('B2')).toBe(['cruiser', 1]);
      expect(board.getTile('B3')).toBe(['cruiser', 2]);
      expect(board.getTile('B4')).toBe([null, null]);
    });

    test('should throw when given invalid coordinates', () => {
      const board = createGameboard();
      expect(board.placeShip('cruiser', 'vertical', 'B12')).toThrowError(RangeError);
      expect(board.placeShip('cruiser', 'vertical', 'B0')).toThrowError(RangeError);
      expect(board.placeShip('cruiser', 'vertical', 'K2')).toThrowError(RangeError);
    });

    test('should throw when given an invalid orientation', () => {
      const board = createGameboard();
      expect(board.placeShip('cruiser', 'abc', 'B1')).toThrowError(RangeError);
    });

    test('should not allow placing over another ship', () => { });
    test('should now allow ship to extend past board boundaries', () => { });
  });
});

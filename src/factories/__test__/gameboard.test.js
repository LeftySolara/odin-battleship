import { describe, expect, test } from '@jest/globals';
import gameboardFactory from '../gameboard';

describe('gameboard object', () => {
  let board;

  beforeEach(() => {
    board = gameboardFactory();
  });

  describe('when placing ships', () => {
    test('should allow placing ships at specific coordinates', () => {
      expect(board.placeShip('cruiser', 'B', '3')).toBe(true);
      expect(board.tileHasShip('B', '2')).toBe(false);
      expect(board.tileHasShip('B', '3')).toBe(true);
      expect(board.tileHasShip('B', '4')).toBe(true);
      expect(board.tileHasShip('B', '5')).toBe(true);
      expect(board.tileHasShip('B', '6')).toBe(false);
    });

    test('should allow placing ships vertically', () => {
      expect(board.placeShip('cruiser', 'C', '5', true)).toBe(true);
      expect(board.tileHasShip('B', '5')).toBe(false);
      expect(board.tileHasShip('C', '5')).toBe(true);
      expect(board.tileHasShip('D', '5')).toBe(true);
      expect(board.tileHasShip('E', '5')).toBe(true);
      expect(board.tileHasShip('F', '5')).toBe(false);
    });

    test('should allow placing ships horizontally', () => {
      expect(board.placeShip('cruiser', 'C', '5', false)).toBe(true);
      expect(board.tileHasShip('C', '4')).toBe(false);
      expect(board.tileHasShip('C', '5')).toBe(true);
      expect(board.tileHasShip('C', '6')).toBe(true);
      expect(board.tileHasShip('C', '7')).toBe(true);
      expect(board.tileHasShip('C', '8')).toBe(false);
    });

    test('should not allow ships to overlap', () => {
      expect(board.placeShip('cruiser', 'C', '5', false)).toBe(true);
      expect(board.placeShip('cruiser', 'B', '6', true)).toBe(false);
    });

    test('should not allow placing ships outside grid boundries', () => {
      expect(board.placeShip('cruiser', 'A', '11')).toBe(false);
      expect(board.placeShip('cruiser', 'K', '2')).toBe(false);
    });

    test('should not allow ship to dangle off board boundries', () => {
      expect(board.placeShip('cruiser', 'B', '10', false)).toBe(false);
      expect(board.placeShip('cruiser', 'J', '3', true)).toBe(false);
    });
  });
});

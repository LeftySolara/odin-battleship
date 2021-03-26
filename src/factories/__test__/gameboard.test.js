import { describe, expect, test } from '@jest/globals';
import gameboardFactory, { TILE_STATES } from '../gameboard';

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

  describe('when an attack is received', () => {
    beforeEach(() => {
      board.placeShip('cruiser', 'C', '5');
    });

    test('should register a hit tile', () => {
      board.receiveAttack('C', '5');
      expect(board.getTileState('C', '5')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C', '5')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C', '5')).toBe(TILE_STATES.hit);

      board.receiveAttack('C', '6');
      expect(board.getTileState('C', '6')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C', '6')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C', '6')).toBe(TILE_STATES.hit);

      board.receiveAttack('C', '7');
      expect(board.getTileState('C', '7')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C', '7')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C', '7')).toBe(TILE_STATES.hit);
    });

    test('should register a missed tile', () => {
      board.receiveAttack('A', '1');
      expect(board.getTileState('A', '1')).toBe(TILE_STATES.missed);
    });

    test('should send hits to the correct ship', () => {
      board.receiveAttack('C', '5');
      board.receiveAttack('C', '6');
      board.receiveAttack('C', '7');

      expect(board.getShip(0).isSunk()).toBe(true);
    });
  });
});

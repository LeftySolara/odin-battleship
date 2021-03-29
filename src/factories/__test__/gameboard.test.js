import { describe, expect, test } from '@jest/globals';
import gameboardFactory, { TILE_STATES, ORIENTATION } from '../gameboard';

describe('gameboard object', () => {
  let board;

  beforeEach(() => {
    board = gameboardFactory();
  });

  describe('when placing ships', () => {
    test('should allow placing ships at specific coordinates', () => {
      expect(board.placeShip('cruiser', 'B3', ORIENTATION.horizontal)).toBe(
        true,
      );
      expect(board.tileHasShip('B2')).toBe(false);
      expect(board.tileHasShip('B3')).toBe(true);
      expect(board.tileHasShip('B4')).toBe(true);
      expect(board.tileHasShip('B5')).toBe(true);
      expect(board.tileHasShip('B6')).toBe(false);
    });

    test('should allow placing ships vertically', () => {
      expect(board.placeShip('cruiser', 'C5', ORIENTATION.vertical)).toBe(true);
      expect(board.tileHasShip('B5')).toBe(false);
      expect(board.tileHasShip('C5')).toBe(true);
      expect(board.tileHasShip('D5')).toBe(true);
      expect(board.tileHasShip('E5')).toBe(true);
      expect(board.tileHasShip('F5')).toBe(false);
    });

    test('should allow placing ships horizontally', () => {
      expect(board.placeShip('cruiser', 'C5', ORIENTATION.horizontal)).toBe(
        true,
      );
      expect(board.tileHasShip('C4')).toBe(false);
      expect(board.tileHasShip('C5')).toBe(true);
      expect(board.tileHasShip('C6')).toBe(true);
      expect(board.tileHasShip('C7')).toBe(true);
      expect(board.tileHasShip('C8')).toBe(false);
    });

    test('should not allow ships to overlap', () => {
      expect(board.placeShip('cruiser', 'C5', ORIENTATION.horizontal)).toBe(
        true,
      );
      expect(board.placeShip('cruiser', 'B6', ORIENTATION.vertical)).toBe(
        false,
      );
    });

    test('should not allow placing ships outside grid boundries', () => {
      expect(board.placeShip('cruiser', 'A11', ORIENTATION.horizontal)).toBe(
        false,
      );
      expect(board.placeShip('cruiser', 'K2', ORIENTATION.horizontal)).toBe(
        false,
      );
    });

    test('should not allow ship to dangle off board boundries', () => {
      expect(board.placeShip('cruiser', 'B10', ORIENTATION.horizontal)).toBe(
        false,
      );
      expect(board.placeShip('cruiser', 'J3', ORIENTATION.vertical)).toBe(
        false,
      );
    });
  });

  describe('when an attack is received', () => {
    beforeEach(() => {
      board.placeShip('cruiser', 'C5');
    });

    test('should register a hit tile', () => {
      board.receiveAttack('C5');
      expect(board.getTileState('C5')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C5')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C5')).toBe(TILE_STATES.hit);

      board.receiveAttack('C6');
      expect(board.getTileState('C6')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C6')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C6')).toBe(TILE_STATES.hit);

      board.receiveAttack('C7');
      expect(board.getTileState('C7')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C7')).toBe(TILE_STATES.hit);
      expect(board.getTileState('C7')).toBe(TILE_STATES.hit);
    });

    test('should register a missed tile', () => {
      board.receiveAttack('A1');
      expect(board.getTileState('A1')).toBe(TILE_STATES.missed);
    });

    test('should send hits to the correct ship', () => {
      board.receiveAttack('C5');
      board.receiveAttack('C6');
      board.receiveAttack('C7');

      expect(board.getShip(0).isSunk()).toBe(true);
    });
  });
});

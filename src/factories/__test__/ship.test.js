import { describe, expect, test } from '@jest/globals';
import shipFactory from '../ship';

describe('ship factory', () => {
  describe('when creating a ship', () => {
    test('should return null if invalid type is requested', () => {
      const carrier = shipFactory('carrier');
      const notReal = shipFactory('notReal');

      expect(carrier).not.toBeNull();
      expect(notReal).toBeNull();
    });

    test('should set the correct length based on ship type', () => {
      const carrier = shipFactory('carrier');
      const battleship = shipFactory('battleship');
      const cruiser = shipFactory('cruiser');
      const submarine = shipFactory('submarine');
      const destroyer = shipFactory('destroyer');

      expect(carrier.getLength()).toBe(5);
      expect(battleship.getLength()).toBe(4);
      expect(cruiser.getLength()).toBe(3);
      expect(submarine.getLength()).toBe(3);
      expect(destroyer.getLength()).toBe(2);
    });
  });
});

describe('ship object', () => {
  let battleship;

  beforeEach(() => {
    battleship = shipFactory('battleship');
  });

  describe('when targeted', () => {
    test('can be hit', () => {
      battleship.hit(1);
      expect(battleship.getHits()).toStrictEqual([false, true, false, false]);
    });

    test('should do nothing if already-hit spot is targeted', () => {
      battleship.hit(1);
      battleship.hit(1);
      expect(battleship.getHits()).toStrictEqual([false, true, false, false]);
    });

    test('should do nothing if given position is out of range', () => {
      battleship.hit(100);
      battleship.hit(-1);
      battleship.hit('1');
      expect(battleship.getHits().includes(true)).toBe(false);
    });

    describe('should correctly determine if it has been sunk', () => {
      test('when there are no hits', () => {
        expect(battleship.isSunk()).toBe(false);
      });

      test('when there are a few hits', () => {
        battleship.hit(0);
        battleship.hit(1);
        expect(battleship.isSunk()).toBe(false);
      });

      test('when all positions are hit', () => {
        battleship.hit(0);
        battleship.hit(1);
        battleship.hit(2);
        battleship.hit(3);
        expect(battleship.isSunk()).toBe(true);
      });
    });
  });
});

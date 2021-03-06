import { beforeEach, describe, expect, test } from '@jest/globals';
import shipFactory from '../ship';

describe('ship factory', () => {
  describe('when creating a ship', () => {
    test('should set the correct length based on type', () => {
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

    test('should return null when requested type is invalid', () => {
      const nullShip = shipFactory('this ship does not exist');
      const blankShip = shipFactory();

      expect(nullShip).toStrictEqual(null);
      expect(blankShip).toStrictEqual(null);
    });
  });

  describe('when a ship is targeted', () => {
    let cruiser;

    beforeEach(() => {
      cruiser = shipFactory('cruiser');
    });

    test('can be hit', () => {
      cruiser.hit(1);
      expect(cruiser.getHits()).toStrictEqual([false, true, false]);
    });

    test('should do nothing if targeting an already-hit spot', () => {
      cruiser.hit(2);
      cruiser.hit(2);
      expect(cruiser.getHits()).toStrictEqual([false, false, true]);
    });

    test('should do nothing if targeted spot is out of range', () => {
      cruiser.hit(-1);
      cruiser.hit(100);
      cruiser.hit('1');
      cruiser.hit();
      expect(cruiser.getHits()).toStrictEqual([false, false, false]);
    });

    test('should sink if all spots are hit', () => {
      expect(cruiser.isSunk()).toBe(false);
      cruiser.hit(0);
      cruiser.hit(1);
      cruiser.hit(2);
      expect(cruiser.isSunk()).toBe(true);
    });
  });
});

import { beforeEach, describe, expect, test } from '@jest/globals';
import createShip from '../src/ship';

describe('ship factory', () => {
  describe('when creating a ship', () => {
    test('should set the length based on type', () => {
      const carrier = createShip('carrier');
      const battleship = createShip('battleship');
      const cruiser = createShip('cruiser');
      const submarine = createShip('submarine');
      const destroyer = createShip('destroyer');

      expect(carrier.getLength()).toBe(5);
      expect(battleship.getLength()).toBe(4);
      expect(cruiser.getLength()).toBe(3);
      expect(submarine.getLength()).toBe(3);
      expect(destroyer.getLength()).toBe(2);
    });

    test('should return null when requested type is invalid', () => {
      const nullShip = createShip('this ship does not exist');
      const blankShip = createShip();

      expect(nullShip).toStrictEqual(null);
      expect(blankShip).toStrictEqual(null);
    });
  });

  describe('when a ship is targeted', () => {
    let cruiser;

    beforeEach(() => {
      cruiser = createShip('cruiser');
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

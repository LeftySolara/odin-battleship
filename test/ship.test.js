import { expect, test } from '@jest/globals';
import createShip from '../src/ship';

describe('Ship factory', () => {
  test('Different types of ships can be created', () => {
    const carrier = createShip('carrier');
    expect(carrier.getLength()).toBe(5);

    const battleship = createShip('battleship');
    expect(battleship.getLength()).toBe(4);

    const cruiser = createShip('cruiser');
    expect(cruiser.getLength()).toBe(3);

    const submarine = createShip('submarine');
    expect(submarine.getLength()).toBe(2);

    const destroyer = createShip('destroyer');
    expect(destroyer.getLength()).toBe(1);

    const nullShip = createShip('this ship does not exist');
    expect(nullShip).toStrictEqual(null);

    const blankShip = createShip();
    expect(blankShip).toStrictEqual(null);
  });

  test('Ships can be hit', () => {
    const carrier = createShip('carrier');

    carrier.hit(1);
    expect(carrier.getHits()).toStrictEqual([false, true, false, false, false]);

    carrier.hit(3);
    expect(carrier.getHits()).toStrictEqual([false, true, false, true, false]);
  });
  test('Trying to hit an already-hit spot does nothing', () => {
    const battleship = createShip('battleship');

    battleship.hit(2);
    expect(battleship.getHits()).toStrictEqual([false, false, true, false]);

    battleship.hit(2);
    expect(battleship.getHits()).toStrictEqual([false, false, true, false]);
  });
  test('Trying to hit a spot outside the ship does nothing', () => {
    const battleship = createShip('battleship');
    expect(battleship.getHits()).toStrictEqual([false, false, false, false]);

    battleship.hit(-1);
    expect(battleship.getHits()).toStrictEqual([false, false, false, false]);

    battleship.hit(100);
    expect(battleship.getHits()).toStrictEqual([false, false, false, false]);

    battleship.hit('1');
    expect(battleship.getHits()).toStrictEqual([false, false, false, false]);

    battleship.hit();
    expect(battleship.getHits()).toStrictEqual([false, false, false, false]);
  });
  test('A ship can be sunk', () => {
    const cruiser = createShip('cruiser');
    expect(cruiser.isSunk()).toBe(false);
    cruiser.hit(0);
    expect(cruiser.isSunk()).toBe(false);
    cruiser.hit(1);
    expect(cruiser.isSunk()).toBe(false);
    cruiser.hit(2);
    expect(cruiser.isSunk()).toBe(true);
  });
});

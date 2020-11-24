import { expect, test } from '@jest/globals';
import createShip from '../src/ship';

describe('Ship factory', () => {
  test('Different ships have different lengths', () => {
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
  });

  test('Ships can be hit', () => {
    const carrier = createShip('carrier');
    carrier.hit(1);
    carrier.hit(3);
    const hits = carrier.getHits();
    expect(hits).toStrictEqual([false, true, false, true, false]);
  });
});

import { describe, expect, test } from '@jest/globals';
import Player from '../player';
import { TILE_STATES, ORIENTATION } from '../factories/gameboard';

describe('player', () => {
  let player;
  let ai;

  beforeEach(() => {
    player = Player();
    ai = Player();
  });

  describe('when played by a human', () => {
    test('should be able to attack the other player', () => {
      ai.board.placeShip('cruiser', 'C4', ORIENTATION.horizontal);
      player.attack(ai, 'A1');
      player.attack(ai, 'C4');

      expect(ai.board.getTileState('A1')).toBe(TILE_STATES.missed);
      expect(ai.board.getTileState('C4')).toBe(TILE_STATES.hit);
    });

    test('should lose if all ships are sunk', () => {
      ai.board.placeShip('destroyer', 'A1', ORIENTATION.horizontal);
      expect(ai.allShipsSunk()).toBe(false);

      player.attack(ai, 'A1');
      player.attack(ai, 'A2');
      expect(ai.allShipsSunk()).toBe(true);
    });
  });

  describe('when played by the AI', () => {
    test('should be able to make random moves', () => {
      player.board.placeShip('destroyer', 'A1', ORIENTATION.horizontal);
      player.board.placeShip('cruiser', 'C4', ORIENTATION.vertical);
      player.board.placeShip('carrier', 'J2', ORIENTATION.horizontal);

      let point = ai.attackRandom(player);
      expect(player.board.getTileState(point[0], point[1])).not.toBe(
        TILE_STATES.hidden,
      );

      point = ai.attackRandom(player);
      expect(player.board.getTileState(point[0], point[1])).not.toBe(
        TILE_STATES.hidden,
      );

      point = ai.attackRandom(player);
      expect(player.board.getTileState(point[0], point[1])).not.toBe(
        TILE_STATES.hidden,
      );
    });
  });
});

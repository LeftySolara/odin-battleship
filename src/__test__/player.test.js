import { describe, expect, test } from '@jest/globals';
import Player from '../player';
import { TILE_STATES } from '../factories/gameboard';

describe('player', () => {
  let player;
  let ai;

  beforeEach(() => {
    player = Player();
    ai = Player();
  });

  describe('when played by a human', () => {
    test('should be able to attack the other player', () => {
      ai.board.placeShip('cruiser', 'C', '4');
      player.attack(ai, 'A', '1');
      player.attack(ai, 'C', '4');

      expect(ai.board.getTileState('A', '1')).toBe(TILE_STATES.missed);
      expect(ai.board.getTileState('C', '4')).toBe(TILE_STATES.hit);
    });

    test('should lose if all ships are sunk', () => {
      ai.board.placeShip('destroyer', 'A', '1', false);
      expect(ai.allShipsSunk()).toBe(false);

      player.attack(ai, 'A', '1');
      player.attack(ai, 'A', '2');
      expect(ai.allShipsSunk()).toBe(true);
    });
  });

  describe('when played by the AI', () => {
    test('should be able to make random moves', () => {
      player.board.placeShip('destroyer', 'A', '1', false);
      player.board.placeShip('cruiser', 'C', '4', true);
      player.board.placeShip('carrier', 'J', '2', false);

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

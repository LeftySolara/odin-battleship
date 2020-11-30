import { beforeEach, describe, expect, test } from '@jest/globals';
import playerFactory from '../player';

describe('during a round', () => {
  let player1;
  let player2;

  beforeEach(() => {
    player1 = playerFactory();
    player2 = playerFactory();

    player2.getGameboard().placeShip('cruiser', 'vertical', 'B1');
  });

  test('players can attack the enemy gameboards', () => {
    expect(player1.attackEnemy(player2, 'B1')).toBe(true);
    expect(player1.attackEnemy(player2, 'G7')).toBe(false);
  });

  test('AI can choose a random tile to attack', () => {
    expect(player2.chooseRandomTile()).toMatch(/^[a-j]([1-9]|1[0])$/i);
    expect(player2.chooseRandomTile()).toMatch(/^[a-j]([1-9]|1[0])$/i);
    expect(player2.chooseRandomTile()).toMatch(/^[a-j]([1-9]|1[0])$/i);
  });
});

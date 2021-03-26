/**
 * The available ship types.
 * Based on the 1990 Milton Bradley rules.
 */
const SHIP_TYPES = [
  'carrier',
  'battleship',
  'cruiser',
  'submarine',
  'destroyer',
];

/**
 * The length of each ship type.
 * Based on the 1990 Milton Bradley rules.
 */
const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

/**
 * Creates a new ship object.
 *
 * @param {string} shipType The type of ship to create.
 */
const shipFactory = (shipType, shipID) => {
  if (!SHIP_TYPES.includes(shipType)) {
    return null;
  }

  const id = shipID;
  const length = SHIP_LENGTHS[shipType];
  const hits = Array(length).fill(false);

  /**
   * Marks a part of the ship as being hit.
   *
   * @param {number} position The position on the ship to hit.
   */
  const hit = (position) => {
    if (typeof position !== 'number' || position < 0 || position >= length) {
      return;
    }
    hits[position] = true;
  };

  /**
   * Determines if the ship has been sunk.
   * A ship is sunk when all of its positions have been hit.
   */
  const isSunk = () => !hits.includes(false);
  const getLength = () => length;
  const getHits = () => hits;

  return { hit, isSunk, getLength, getHits, id };
};

export default shipFactory;

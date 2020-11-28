/**
 * The available ship types.
 * Based on the 1990 Milton Bradley rules.
 */
const SHIP_TYPES = [
  'destroyer',
  'submarine',
  'cruiser',
  'battleship',
  'carrier',
];

/**
 * The length of each ship type.
 * Based on the 1990 Milton Bradley rules.
 */
const SHIP_LENGTHS = {
  destroyer: 2,
  submarine: 3,
  cruiser: 3,
  battleship: 4,
  carrier: 5,
};

/**
 * Creates a new ship object.
 *
 * @param {string} shipType The type of ship to create.
 */
const shipFactory = (shipType) => {
  if (!SHIP_TYPES.includes(shipType)) {
    return null;
  }

  const length = SHIP_LENGTHS[shipType];
  const hits = Array(length).fill(false);

  /**
   * Marks a part of the ship as being hit. If the requested position does not exist,
   * does nothing.
   *
   * @param {number} position The position of the ship to hit.
   */
  const hit = (position) => {
    if (typeof position !== 'number' || position < 0 || position >= length) {
      return;
    }
    hits[position] = true;
  };

  const getLength = () => length;
  const getHits = () => hits;
  const isSunk = () => !hits.includes(false);

  return { hit, getLength, getHits, isSunk };
};

export default shipFactory;

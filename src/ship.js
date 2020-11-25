/**
 * Length for each ship. Based on the 1990 Milton Bradley rules.
 */
const SHIP_LENGTHS = Object.freeze({
  destroyer: 2,
  submarine: 3,
  cruiser: 3,
  battleship: 4,
  carrier: 5,
});

/**
 * Factory function for creating ships.
 *
 * @param {string} type The type of ship to create.
 * @returns A ship object.
 */
const createShip = (type) => {
  if (!(type in SHIP_LENGTHS)) {
    return null;
  }

  const length = SHIP_LENGTHS[type];
  const hits = Array(length);
  hits.fill(false);
  Object.seal(hits);

  const getLength = () => length;
  const getHits = () => hits;

  /**
   * Marks a location on the ship as being hit.
   *
   * @param {number} location The position of the ship to hit.
   */
  function hit(location) {
    if (typeof location !== 'number' || location < 0 || location >= length) {
      return;
    }
    hits[location] = true;
  }

  /**
   * Checks whether the ship has been sunk.
   * A ship is sunk when all its locations have been hit.
   */
  function isSunk() {
    return hits.indexOf(false) === -1;
  }

  return { hit, isSunk, getLength, getHits };
};

export default createShip;

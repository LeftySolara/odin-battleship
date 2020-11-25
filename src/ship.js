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

const createShip = (type) => {
  if (!(type in SHIP_LENGTHS)) {
    return null;
  }

  const length = SHIP_LENGTHS[type];
  const hits = Array(length);
  hits.fill(false);
  Object.seal(hits);

  function hit(location) {
    if (typeof location !== 'number' || location < 0 || location >= length) {
      return;
    }
    hits[location] = true;
  }

  function isSunk() {
    return hits.indexOf(false) === -1;
  }

  const getLength = () => length;
  const getHits = () => hits;

  return { hit, isSunk, getLength, getHits };
};

export default createShip;

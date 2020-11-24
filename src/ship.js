const SHIP_LENGTHS = Object.freeze({
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 2,
  destroyer: 1,
});

const createShip = (type) => {
  const length = SHIP_LENGTHS[type];
  const hits = Array(length);
  hits.fill(false);
  Object.seal(hits);

  function hit(location) {
    hits[location] = true;
  }

  const getLength = () => length;
  const getHits = () => hits;

  return { hit, getLength, getHits };
};

export default createShip;

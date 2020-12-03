// TODO: Rename all this stuff

import React from 'react';
import './gameboardDisplay.css';

const tileClasses = {
  ship: 'live-ship',
  sunk: 'sunk-ship',
  miss: 'missed-attack',
  hit: 'successful-attack',
  empty: 'empty-tile',
};

function GameboardTile(props) {
  const { data } = props;

  const getTileClass = (tileData) => {
    if (tileData === null) {
      return tileClasses.empty;
    }
    if (tileData === -1) {
      return tileClasses.miss;
    }
    return tileClasses.ship;
  };

  const tileClass = getTileClass(data);
  let marker = '';

  if (tileClass === tileClasses.miss) {
    marker = 'O';
  } else if (tileClass === tileClasses.hit) {
    marker = 'X';
  }

  return <div className={`grid-tile ${tileClass}`}>{marker}</div>;
}

function GameboardDisplay(props) {
  const { board } = props;

  return (
    <div className="grid">
      {board.map((row) => {
        return (
          <div className="grid-row">
            {row.map((column) => {
              return <GameboardTile data={column} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameboardDisplay;

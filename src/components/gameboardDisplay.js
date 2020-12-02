// TODO: Rename all this stuff

import React from 'react';
import './gameboardDisplay.css';

function GameboardTile(props) {
  const { text } = props;
  return <div className="gameboard-tile">{text}</div>;
}

function GameboardDisplay(props) {
  const { board } = props;

  return (
    <div className="grid">
      {board.map((row) => {
        return (
          <div className="grid-row">
            {row.map((column) => {
              return <GameboardTile text={column} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameboardDisplay;

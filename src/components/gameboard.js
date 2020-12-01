import React from 'react';
import './gameboard.css';

function GameboardTile(props) {
  const { text } = props;
  return (
    <div className="grid-tile">
      <p>{text}</p>
    </div>
  );
}

function Gameboard() {
  const grid = Array(10)
    .fill(null)
    .map(() => Array(10).fill('a'));

  return (
    <table>
      {grid.map((element) => {
        const row = element.map((el) => {
          return (
            <td>
              <GameboardTile text={el} />
            </td>
          );
        });
        return (
          <tr>
            <td>{row}</td>
          </tr>
        );
      })}
    </table>
  );
}

export default Gameboard;

import React from 'react';

const AlphaButtons = (props) => {
  const { handler, gameOver, guessed } = props;
  return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
    <button
      className="Hangman-button"
      key={ltr}
      value={ltr}
      onClick={handler}
      disabled={gameOver ? true : guessed.has(ltr)}
    >
      {ltr}
    </button>
  ));
}

export default AlphaButtons;
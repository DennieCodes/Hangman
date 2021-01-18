import React, { Component } from 'react';

class AlphaButtons extends Component {
  render() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        className="Hangman-button"
        key={ltr}
        value={ltr}
        onClick={this.props.handler}
        disabled={this.props.gameOver ? true : this.props.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
}

export default AlphaButtons;
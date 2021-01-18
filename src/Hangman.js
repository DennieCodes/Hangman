import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words';
import AlphaButtons from "./AlphaButtons";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0,
      guessed: new Set(), 
      answer: randomWord()
    };    
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  restart(evt) {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word: if guessed letters are {a,p,e}, show "app_e" for "apple" */
  guessedWord() {
    return this.wrongCounter() ? this.state.answer : this.parseAnswer();
  }

  guessedCorrect() {
    const parsedAnswer = this.parseAnswer();
    const correct = parsedAnswer.indexOf("_") === -1 && parsedAnswer.length === this.state.answer.length
      ? true : false;    

    return correct;
  }

  parseAnswer() {
    return this.state.answer.split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  wrongCounter() {
    return this.state.nWrong === this.state.answer.length;
  }

  /** render: render game */
  render() {
    const prompt = this.wrongCounter() ? "Too many guesses.  You lose!" : 
      this.guessedCorrect() ? "You win!" :
      `Number of wrong guesses: ${this.state.nWrong}`;
    const image = this.props.images[this.wrongCounter() ? this.state.answer.length : this.state.nWrong];
    const altText = `${this.state.nWrong} wrong guess(es)`;
    
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={image} alt={altText}/>
        <p className='Hangman-prompt'>{prompt}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p>
          <AlphaButtons 
            gameOver={this.wrongCounter() || this.guessedCorrect() ? true : false} 
            handler={this.handleGuess}
            guessed={this.state.guessed}
          />
        </p>
        
        <button className="Hangman-restart" onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

export default Hangman;

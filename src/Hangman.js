import React, { useState } from "react";
import AlphaButtons from "./AlphaButtons";
import "./Hangman.css";

import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words';

const Hangman = () => {
  //Set up state, handler and destructured items
  const [ hangman, hangmanSet ] = useState({ 
    nWrong: 0, 
    guessed: new Set(), 
    answer: randomWord()
  });

  const { nWrong, guessed, answer } = hangman;

  const images = [img0, img1, img2, img3, img4, img5, img6];

  // Compares the number of guesses against the length of the word in answer
  const wrongCounter = () => nWrong === answer.length;

  // Returns the parts of the answer that have been guessed by the user
  const parseAnswer = () => {
    return answer.split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  // Compares the user's guessed word agains the randomly generated word
  const guessedCorrect = () => {
    const parsedAnswer = parseAnswer();
    return parsedAnswer.indexOf("_") === -1 && parsedAnswer.length === answer.length
      ? true : false;    
  }

  // Returns either the answer or the incomplete guessed letters
  const guessedWord = () => wrongCounter() ? answer : parseAnswer();

  // Function which responds to user guesses and updates state  
  const handleGuess = evt => {
    let ltr = evt.target.value;

    hangmanSet({
      ...hangman,
      guessed: guessed.add(ltr),
      nWrong: nWrong + (answer.includes(ltr) ? 0 : 1)
    })
  }

  // Restarts the game by reseting state
  const restart = evt => {
    hangmanSet({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  // Set up conditional display messages
  const prompt = wrongCounter() ? "Too many guesses.  You lose!" : 
    guessedCorrect() ? "You win!" :
    `Number of wrong guesses: ${nWrong}`;
  
  const image = images[wrongCounter() ? answer.length : nWrong];
  const altText = `${nWrong} wrong guess(es)`;

  return (
    <div className='Hangman'>
      <h1>Hangman</h1>
      <img src={image} alt={altText}/>
      <p className='Hangman-prompt'>{prompt}</p>
      <p className='Hangman-word'>{guessedWord()}</p>
      <p>
        <AlphaButtons 
          gameOver={wrongCounter() || guessedCorrect() ? true : false} 
          handler={handleGuess}
          guessed={guessed}
        />
      </p>
      
      <button className="Hangman-restart" onClick={restart}>Restart</button>
    </div>
  );
};

export default Hangman;
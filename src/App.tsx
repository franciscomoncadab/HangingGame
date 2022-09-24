import { useState, useEffect } from "react";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getRandomWorld } from "./helpers/getRandomWord";
import "./App.css";

function App() {
  const [word, setWord] = useState(getRandomWorld);
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (attempts >= 9) {
      setLose(true);
    }
  }, [attempts]);

  useEffect(() => {
    const currenteHiddenWord = hiddenWord.split(" ").join("");
    if (currenteHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    if (lose || won) {
      return;
    }
    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () => {
    const newWord = getRandomWorld();

    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));

    setAttempts(0);
    setLose(false);
    setWon(false);
  };

  return (
    <div className="App">
      <>
        {/* Imagenes */}
        <HangImage imageNumber={attempts} />

        {/* Palabra oculta */}
        <h3> {hiddenWord} </h3>

        {/* Contador */}
        <h3>Intentos: {attempts}</h3>

        {/* Mensaje si perdio */}
        {lose ? <h2>PERDISTE!! La palabra era: {word}</h2> : ""}

        {/* Mensaje si gano */}
        {won ? <h2>GANASTE!! Felicidades</h2> : ""}

        {/* Botones */}
        {letters.map((letter) => (
          <button onClick={() => checkLetter(letter)} key={letter}>
            {letter}
          </button>
        ))}

        <br />
        <button onClick={() => newGame()}> Jugar de Nuevo</button>
      </>
    </div>
  );
}

export default App;

import { useState } from "react";
import Swal from "sweetalert2";

import { randomizeArr } from "../utils/randomize";
import imagesData from "../data/images";
import Card from "./Card";

function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Score: {score}</p>
      <p>
        <b>Best score: {bestScore}</b>
      </p>
    </div>
  );
}

export default function Game() {
  const [images, setImages] = useState(randomizeArr(imagesData));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [guessedNames, setGuessedNames] = useState([]);

  const handleClick = (currentImgName) => () => {
    setImages(randomizeArr(images));

    // Game over
    if (guessedNames.includes(currentImgName)) {
      setScore(0);
      setGuessedNames([]);

      Swal.fire({
        title: "You lost...",
      });
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setGuessedNames([...guessedNames, currentImgName]);

      if (newScore > bestScore) setBestScore(newScore);

      // Winning
      if (newScore === images.length) {
        setScore(0);
        setGuessedNames([]);

        Swal.fire({
          title: "You won!",
        });
      }
    }
  };

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="cards">
        {images.map((name) => (
          <Card key={name} name={name} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}

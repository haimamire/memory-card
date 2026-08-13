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
      <p>Best score: {bestScore}</p>
    </div>
  );
}

export default function Game() {
  const [images, setImages] = useState(randomizeArr(imagesData));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [guessedIds, setGuessedIds] = useState([]);

  const handleClick = (currentImgId) => () => {
    setImages(randomizeArr(images));

    // Game over
    if (guessedIds.includes(currentImgId)) {
      setScore(0);
      setGuessedIds([]);

      Swal.fire({
        title: "You lost...",
      });
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setGuessedIds([...guessedIds, currentImgId]);

      if (newScore > bestScore) setBestScore(newScore);

      // Winning
      if (newScore === imagesData.length) {
        setScore(0);
        setGuessedIds([]);

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
        {images.map((id) => (
          <Card key={id} imgId={id} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}

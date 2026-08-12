import { useState } from "react";
import originalImgIds from "../data/images";
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
  const [imgIds, setImgIds] = useState(originalImgIds);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [guessedIds, setGuessedIds] = useState([]);

  const handleClick = (currentImgId) => () => {
    // Game over
    if (guessedIds.includes(currentImgId)) {
      setScore(0);
      setGuessedIds([]);
      alert("u lost");
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setBestScore(newScore);
      setGuessedIds([...guessedIds, currentImgId]);
      // Winning
      if (newScore === originalImgIds.length) {
        alert("u won");
      }
    }
  };

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="cards">
        {imgIds.map((id) => (
          <Card key={id} imgId={id} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}

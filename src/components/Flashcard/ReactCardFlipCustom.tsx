import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Flashcard } from "~/types/FlashCard";

const ReactCardFlipCustom = ({ flashcard }: { flashcard: Flashcard }) => {
  const [isFliped, setIsFliped] = useState(false);
  function FlipCard() {
    setIsFliped(!isFliped);
  }
  return (
    <ReactCardFlip flipDirection="vertical" isFlipped={isFliped}>
      <div
        className=" shadow-sm shadow-slate-300 py-14 px-10 h-[350px] bg-white"
        onClick={FlipCard}
      >
        {flashcard.term}
      </div>
      <p
        className="whitespace-pre-wrap shadow-sm shadow-slate-300 py-14 px-10 h-[350px] bg-white"
        onClick={FlipCard}
      >
        {flashcard.answers.map((answer) => answer.definition).join("\n")}
      </p>
    </ReactCardFlip>
  );
};

export default ReactCardFlipCustom;

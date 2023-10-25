import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Flashcard } from "~/types/FlashCard";

const ReactCardFlipCustom = ({ flashcard }: { flashcard: Flashcard }) => {
  const [isFliped, setIsFliped] = useState(false);
  function FlipCard() {
    setIsFliped(!isFliped);
  }
  return (
    <div className="h-[250px]">
      <ReactCardFlip flipDirection="vertical" isFlipped={isFliped}>
        <p className="h-[200px]" onClick={FlipCard}>
          {flashcard.frontContent}
        </p>
        <p className="h-[200px]" onClick={FlipCard}>
          {flashcard.backContent}
        </p>
      </ReactCardFlip>
    </div>
  );
};

export default ReactCardFlipCustom;

import { Answer } from "./Answer";
import { Flashcard } from "./FlashCard";
export interface LearningModeQuestion extends Flashcard {
  numOfLearning: number;
}

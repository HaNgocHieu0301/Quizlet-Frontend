import { Answer } from "./Answer";
import { Flashcard } from "./Flashcard";
export interface LearningModeQuestion extends Flashcard {
  numOfLearning: number;
}

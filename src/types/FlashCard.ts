import { Answer } from "./Answer";

export interface Flashcard {
  questionId: number;
  learningStatusId: number;
  term: string;
  isStarred: boolean;
  lessonId: number;
  answers: Answer[];
}

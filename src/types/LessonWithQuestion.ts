import { Lesson } from "~/type";
import { Flashcard } from "./FlashCard";

export interface LessonWithQuestion extends Lesson {
  questions: Flashcard[];
}

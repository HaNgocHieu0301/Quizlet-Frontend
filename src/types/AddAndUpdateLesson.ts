import { Flashcard } from "./FlashCard";

export interface AddAndUpdateLesson {
  lessonId: number;
  title: string;
  description: string;
  createAt: Date;
  modifiedAt: Date;
  visibleId: number;
  folderId: number;
  rate: number;
  questions: Flashcard[];
  userId: string;
}

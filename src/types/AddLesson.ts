import { Flashcard } from "./FlashCard";

export interface AddLesson {
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

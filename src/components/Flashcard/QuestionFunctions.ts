import { Flashcard } from "~/types/FlashCard";
import axios from "axios";

export const RemoveAnswerInQuestion = async (
  answerId: number,
  flashcard: Flashcard
) => {
  try {
    const response = await axios.delete(
      "http://localhost:5219/api/Answers/DeleteAnswer/" + answerId
    );
    if (response.status >= 200 && response.status < 300) {
      const updatedFlashcard = {
        ...flashcard,
        answers: flashcard.answers.filter(
          (answer) => answer.answerId !== answerId
        ),
      };
      return updatedFlashcard;
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdateQuestion = async (
  updatedValue: Flashcard,
  updateFlashcardsCallback: Function
) => {
  const QuestionsJson = JSON.stringify(updatedValue);
  try {
    const response = await axios.put(
      "http://localhost:5219/api/Questions/UpdateQuestion",
      QuestionsJson,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      updateFlashcardsCallback(updatedValue);
    }
  } catch (error) {
    console.log(error);
  }
};
export const UpdateLesson = async (updatedList: Flashcard[]) => {
  const QuestionsListJson = JSON.stringify(updatedList);
  try {
    const response = await axios.put(
      "http://localhost:5219/api/Questions/UpdateQuestions",
      QuestionsListJson,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return updatedList;
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchFlashcardsByLessonId = async (lessonId: number) => {
  try {
    const response = await axios.get<any[]>(
      "http://localhost:5219/api/Questions?$filter=lessonId eq " + lessonId
    );
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
  }
};
export const RemoveQuestion = async (questionId: number) => {
  try {
    const response = await axios.delete(
      "http://localhost:5219/api/Questions/DeleteQuestion/" + questionId
    );
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

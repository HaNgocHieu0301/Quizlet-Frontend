import { useState, createRef, useEffect } from "react";
import { Flex, Button, Dropdown } from "antd";
import Icons from "~/assets/icons";
import IconSvg from "../../components/IconSvg";
import ModeHeader from "../../components/Flashcard/ModeHeader";
import { useParams } from "react-router-dom";
import { Flashcard } from "~/types/FlashCard";
import { fetchFlashcardsByLessonId } from "~/components/Flashcard/QuestionFunctions";
import { LearningModeQuestion } from "~/types/LearningModeQuestion";
import { Answer } from "~/types/Answer";

const LearningMode = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lessonIdNum: number = parseInt(lessonId as string);
  const [currentFlashcard, setCurrentFlashcard] =
    useState<LearningModeQuestion>({
      questionId: -1,
      learningStatusId: 1,
      term: "",
      isStarred: false,
      lessonId: 1,
      numOfLearning: 1,
      answers: [],
    });
  const [flashcards, setFlashcards] = useState<LearningModeQuestion[]>([]);

  const checkAnswerHandler = (answer: Answer) => {
    console.log("correct");
    const index: number = flashcards.indexOf(currentFlashcard) + 1;
    if (index < flashcards.length) {
      flashcards[index].numOfLearning += 1;
      setCurrentFlashcard(flashcards[index]);
    } else if (index === flashcards.length) {
      setCurrentFlashcard(flashcards[0]);
    }
  };
  useEffect(() => {
    if (flashcards.length === 0) {
      fetchFlashcardsByLessonId(lessonIdNum).then((fetchedFlashcards) => {
        if (Array.isArray(fetchedFlashcards)) {
          const tmp = fetchedFlashcards.map((flashcard) => {
            return SetLearningModeQuestion(flashcard);
          });
          setFlashcards(tmp);
          setCurrentFlashcard(tmp[0]);
        }
      });
    }
    // if (flashcards.length > 0 && currentFlashcard.questionId === -1) {
    //   setCurrentFlashcard(SetLearningModeQuestion(flashcards[0]));
    // }
  }, [lessonIdNum, flashcards]);
  return (
    <div className="bg-[#f6f7fb] w-full h-[100vh]">
      {/* <div className="ModeHeader bg-white">
        <Flex justify="space-between" align="center" className="px-6 h-16">
          <Flex justify="space-between" align="center">
            <Dropdown
              trigger={["click"]}
              placement="bottomLeft"
              dropdownRender={(menu) => (
                <div className="w-[250px] my-1 bg-white shadow-lg rounded-lg">
                  <Flex vertical className="py-4">
                    <Button
                      type="text"
                      className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                      icon={
                        <IconSvg
                          width={20}
                          height={20}
                          iconName="study-learn-twilight"
                        />
                      }
                    >
                      <span>Hoc</span>
                    </Button>
                    <Button
                      type="text"
                      className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                      icon={
                        <IconSvg
                          width={20}
                          height={20}
                          iconName="study-flashcards-twilight"
                        />
                      }
                    >
                      <span>The ghi nho</span>
                    </Button>
                    <Button
                      type="text"
                      className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                      icon={
                        <IconSvg
                          width={20}
                          height={20}
                          iconName="mode-test-2022"
                        />
                      }
                    >
                      <span>Kiem tra</span>
                    </Button>
                    <Button
                      type="text"
                      className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                      icon={
                        <IconSvg
                          width={20}
                          height={20}
                          iconName="mode-match-2022"
                        />
                      }
                    >
                      <span>Ghep the</span>
                    </Button>
                    <hr />
                    <Flex
                      align="center"
                      className="w-full h-9 px-4 hover:bg-black/5"
                    >
                      <a href="#id">Trang chu</a>
                    </Flex>
                    <Flex
                      align="center"
                      className="w-full h-9 px-4 hover:bg-black/5"
                    >
                      <a href="#id">Tim kiem</a>
                    </Flex>
                  </Flex>
                </div>
              )}
            >
              <Button
                type="text"
                size="large"
                className="flex flex-row gap-2 items-center justify-center"
                icon={
                  <IconSvg
                    width={25}
                    height={25}
                    iconName="study-learn-twilight"
                  />
                }
              >
                <span className="font-semibold">Học</span>
                <IconSvg iconName="caret-down" />
              </Button>
            </Dropdown>
          </Flex>
          <Flex justify="space-between" align="center">
            <a href="#1" className="text-black font-semibold">
              Pờ tờ MLN111
            </a>
          </Flex>
          <Flex justify="space-between" align="center" gap="middle">
            <Button size="large">Tuy Chon</Button>
            <Button size="large" icon={<IconSvg iconName="close-x" />} />
          </Flex>
        </Flex>
      </div> */}
      <ModeHeader />
      <div className="Main w-full">
        <div className="p-6">
          <div className="bg-white rounded-lg max-w-[53rem] my-0 mx-auto shadow-lg">
            {/* iterate throught flashcards */}
            <article className="flex flex-col gap-10 px-8 py-6">
              <Flex vertical className="mb-16">
                <Flex>
                  <Flex gap="large" justify="center" align="center">
                    <span>Thuat ngu</span>
                    {/* <span className="bg-[#ffe8d8] rounded-3xl px-2 py-1">
                      <span>Hay thu lai lan nua</span>
                    </span> */}
                  </Flex>
                </Flex>
                <Flex>
                  <Flex>
                    <h2>{currentFlashcard?.term}</h2>
                  </Flex>
                </Flex>
              </Flex>
              <div>
                <Flex className="pb-6">
                  <h2>Chon dinh nghia dung</h2>
                </Flex>
                <div>
                  <div className="grid gap-6 grid-rows-2 grid-cols-2">
                    {currentFlashcard?.answers.map((answer, index) => (
                      <Button
                        key={index}
                        className="min-h-[60px] hover:border-black whitespace-normal break-words"
                        size="large"
                        onClick={() => checkAnswerHandler(answer)}
                      >
                        {answer.definition}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <Icons />
    </div>
  );
};
const SetLearningModeQuestion = (flashcard: Flashcard) => {
  return {
    questionId: flashcard.questionId,
    learningStatusId: flashcard.learningStatusId,
    term: flashcard.term,
    isStarred: flashcard.isStarred,
    lessonId: flashcard.lessonId,
    answers: flashcard.answers,
    numOfLearning: 1,
  };
};
export default LearningMode;

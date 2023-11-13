import ReactDOM from "react-dom";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import IconSvg from "../../components/IconSvg";
import Icons from "~/assets/icons";
import { Button, Flex, Input, Form } from "antd";
import TermRow from "../../components/Flashcard/TermRow";
import ImportModal from "../../components/Flashcard/ImportModal";
import axios from "axios";
import { Answer } from "~/types/Answer";
import { Flashcard } from "~/types/Flashcard";
import {
  RemoveAnswerInQuestion,
  RemoveQuestion,
  fetchFlashcardsByLessonId,
} from "~/components/Flashcard/QuestionFunctions";
import { useParams } from "react-router-dom";

const EditingMode = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lessonIdNum: number = parseInt(lessonId as string);
  const [isFocusTitle, setIsFocusTitle] = useState(false);
  const [isFocusDescription, setIsFocusDescription] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]); // [ [word, definition], [word, definition
  const flashcardListRef = useRef<any>(null);
  const flashcardFormRef = useRef<any>(null);

  const importedCallback = (lst: Flashcard[]) => {
    // for (let i = 0; i < lst.length; i++) {
    //   lst[i].questionId = 0;
    // }
    const tmp = flashcards.concat(
      lst.map((flashcard) => ({
        ...flashcard,
        questionId: 0,
        lessonId: lessonIdNum,
        answers: flashcard.answers.map((answer) => ({
          ...answer,
          answerId: 0,
          questionId: 0,
          image: "",
        })),
      }))
    );
    setIsOpenImportModal(false);
    setFlashcards(tmp);
  };

  const removeFlashcardCallback = (id: number) => {
    const tmp = flashcards.filter((flashcard) => flashcard.questionId !== id);
    setFlashcards(tmp);
    RemoveQuestion(id);
  };

  const swapTermAndDefinitionHandler = () => {
    // console.log("swap");
    // const tmp = flashcards.map((flashcard) => {
    //   // for (let i = 1; i < flashcard.answers.length; i++) {
    //   //   RemoveAnswerInQuestion(flashcard.answers[i].answerId, flashcard);
    //   // }
    //   const tmp2: Flashcard = {
    //     ...flashcard,
    //     term: flashcard.answers.map((answer) => answer.definition).join("\n"),
    //     answers: [
    //       {
    //         answerId: flashcard.answers[0].answerId,
    //         questionId: flashcard.questionId,
    //         definition: flashcard.term,
    //         image: "",
    //       },
    //     ],
    //   };
    //   return tmp2;
    // });
    // console.log(tmp);
    // setFlashcards(tmp);
  };

  const addNewLineHandler = () => {
    const fl: Flashcard = {
      learningStatusId: 1,
      lessonId: lessonIdNum,
      questionId: 0,
      term: "",
      answers: [{ definition: "", answerId: 0, image: "", questionId: 0 }],
      isStarred: false,
    };

    let tmp = [...flashcards, fl];
    setFlashcards(tmp);
  };

  const handleSubmitForm = async () => {
    try {
      const data: Flashcard[] = flashcardListRef.current.getValue();
      console.log(data);
      const Questions: Flashcard[] = [];
      data.forEach((element: Flashcard) => {
        Questions.push({
          questionId: element.questionId,
          learningStatusId: element.learningStatusId,
          term: element.term,
          isStarred: element.isStarred,
          lessonId: element.lessonId,
          answers: element.answers,
        });
      });
      const QuestionsJson = JSON.stringify(Questions);
      console.log(QuestionsJson);
      const response = await axios.put(
        "http://localhost:5219/api/Questions/UpdateQuestions",
        QuestionsJson,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        window.location.href = "/lesson/" + lessonIdNum;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (flashcards.length <= 0) {
      console.log("fetchData");
      fetchFlashcardsByLessonId(lessonIdNum).then((fetchedFlashcards) => {
        if (Array.isArray(fetchedFlashcards)) {
          setFlashcards(fetchedFlashcards);
        }
      });
    }
  }, [lessonIdNum]);

  return (
    <>
      <main className="w-full">
        <div>
          <div className="CreateSetPage">
            <div className="Header overflow-visible py-6">
              <div className="Nav mb-8">
                <div className="bg-[#f6f7fb] h-16">
                  <div className="UIContainer mx-auto max-w-[81.25em] px-10">
                    <Flex
                      align="center"
                      justify="space-between"
                      className="h-16"
                    >
                      <Flex>
                        <Flex>
                          <div>
                            <a href="#id">
                              <span>Tro ve hoc phan truoc</span>
                            </a>
                          </div>
                        </Flex>
                      </Flex>
                      <div>
                        <Button
                          size="middle"
                          type="primary"
                          onClick={handleSubmitForm}
                        >
                          <span>Hoan Tat</span>
                        </Button>
                      </div>
                    </Flex>
                  </div>
                </div>
              </div>
              {/* header with title and description input */}
              <Flex
                vertical
                gap={"small"}
                className="UIContainer mx-auto max-w-[81.25em] px-10"
              >
                <Flex vertical gap={"small"} className="w-[50%]">
                  <Flex
                    vertical
                    align="flex-start"
                    className="max-w-[36.75rem]"
                  >
                    <div className="w-full">
                      <Input
                        defaultValue="MLN111 tong hop"
                        bordered={false}
                        className="p-0"
                        onFocus={() => setIsFocusTitle(true)}
                        onBlur={() => setIsFocusTitle(false)}
                      />
                      <hr
                        className={
                          isFocusTitle ? "border-[#ffcd1f]" : "border-black"
                        }
                      />
                      <Flex align="flex-start" className="">
                        <div className="text-[#939bb4] font-semibold text-[0.75rem] uppercase border-t-2 border-[#ffcd1f]">
                          Tieu de
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                </Flex>
                <Flex vertical gap={"small"} className="w-[50%]">
                  <Flex
                    vertical
                    align="flex-start"
                    className="max-w-[36.75rem]"
                  >
                    <div className="w-full">
                      <Input
                        defaultValue="Mo ta hoc phan"
                        bordered={false}
                        className="p-0"
                        onFocus={() => setIsFocusDescription(true)}
                        onBlur={() => setIsFocusDescription(false)}
                      />
                      <hr
                        className={
                          isFocusDescription
                            ? "border-[#ffcd1f]"
                            : "border-black"
                        }
                      />
                      <Flex align="flex-start" className="">
                        <div className="text-[#939bb4] font-semibold text-[0.75rem] uppercase border-t-2 border-[#ffcd1f]">
                          Mo ta
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                </Flex>
              </Flex>
              {/* options button */}
              <Flex
                justify="space-between"
                className="UIContainer mx-auto max-w-[81.25em] px-10 mt-5"
              >
                <Flex>
                  <Button
                    className="flex flex-row justify-start items-center"
                    icon={<IconSvg width={16} height={16} iconName="plus" />}
                    onClick={() => setIsOpenImportModal(true)}
                  >
                    Nhap
                  </Button>
                </Flex>
                <Flex gap={"middle"}>
                  <Button
                    shape="circle"
                    className="flex flex-row justify-center items-center"
                    icon={
                      <IconSvg width={16} height={16} iconName="settings" />
                    }
                  />
                  {/* swap term and definition button */}
                  <Button
                    shape="circle"
                    className="flex flex-row justify-center items-center"
                    icon={
                      <IconSvg
                        width={16}
                        height={16}
                        iconName="swap-horizontal"
                      />
                    }
                    onClick={swapTermAndDefinitionHandler}
                  />
                </Flex>
              </Flex>
            </div>
            <div className="MainContent">
              <Flex className="UIContainer mx-auto max-w-[81.25em] px-10">
                <div className="py-6">
                  <div className="StudiableItems">
                    <Form ref={flashcardFormRef}>
                      <Form.Item name="flashcards">
                        <FlashcardControl
                          ref={flashcardListRef}
                          flashcards={flashcards}
                          removeCallback={removeFlashcardCallback}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Flex>
            </div>
            {/* Add new row */}
            <div className="UIContainer mx-auto max-w-[81.25em] px-10">
              <div className="py-6">
                <div className="StudiableItems text-center">
                  <button
                    className="bg-white border-t-0 border-l-0 border-r-0 cursor-pointer font-bold border-b-4 border-b-[#3ccfcf] hover:text-[#ffcd1f] hover:border-b-yellow-400 py-2 px-0"
                    onClick={addNewLineHandler}
                  >
                    <span>+ Thêm Thẻ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ImportModal
            isOpen={isOpenImportModal}
            closeHandler={() => setIsOpenImportModal(false)}
            importedCallback={importedCallback}
          />
        </div>
      </main>
      <Icons />
    </>
  );
};
const FlashcardControl = forwardRef<any, any>(
  ({ flashcards, removeCallback }, ref) => {
    const [localFlashcards, setLocalFlashcards] =
      useState<Flashcard[]>(flashcards);
    useEffect(() => {
      console.log("FlashcardControlEffect");
      console.log(flashcards);
      setLocalFlashcards(flashcards);
      console.log(localFlashcards);
    }, [flashcards]);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        return localFlashcards;
      },
    }));

    const updateFlashcard = (id: number, updatedFields: any) => {
      console.log("Update Flashcard");
      console.log(JSON.stringify(updatedFields));
      const updatedFlashcards = localFlashcards.map((flashcard: Flashcard) =>
        flashcard.questionId === id
          ? {
              ...flashcard,
              isStarred: updatedFields.isStarred,
              term: updatedFields.term,
              answers: updatedFields.answers.map(
                (answer: Answer, index: number) => ({
                  ...answer,
                  image: "",
                  questionId: flashcard.questionId,
                  definition: answer.definition,
                })
              ),
            }
          : flashcard
      );
      console.log("Updated Flashcard");
      console.log(updatedFlashcards);
      setLocalFlashcards(updatedFlashcards);
    };
    return (
      <>
        {localFlashcards.map((flashcard: Flashcard, index: number) => (
          <TermRow
            key={index}
            index={index + 1}
            flashcard={flashcard}
            removeCallback={removeCallback}
            updateCallback={(updatedFields: any) =>
              updateFlashcard(flashcard.questionId, updatedFields)
            }
          />
        ))}
      </>
    );
  }
);
export default EditingMode;

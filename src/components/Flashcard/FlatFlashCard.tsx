import { useEffect, useState } from "react";
import IconSvg from "../IconSvg";
import { Button, ConfigProvider, Form, Input, Flex } from "antd";
import { Flashcard } from "~/types/Flashcard";
import { Answer } from "~/types/Answer";
import axios from "axios";
import { UpdateQuestion, RemoveAnswerInQuestion } from "./QuestionFunctions";
const { TextArea } = Input;

const FlatFlashCard = ({
  flashcard,
  updateFlashcardCallback,
}: {
  flashcard: Flashcard;
  updateFlashcardCallback: Function;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    // setDefinitions(flashcard.answers);
  }, [flashcard]);

  const starredHandler = (fc: Flashcard) => {
    const updatedValue = { ...fc, isStarred: !fc.isStarred };
    UpdateQuestion(updatedValue, updateFlashcardCallback);
  };

  const buttonEditHandler = (event: any) => {
    if (!isEditing) {
      event.preventDefault();
      setIsEditing(true);
    } else {
      console.log("submit");
    }
  };
  const [form] = Form.useForm();
  // Hàm để xử lý submit form
  const onFormSubmit = async (values: any) => {
    // Tách ra term và definitions từ giá trị của form
    const { term, ...definitions } = values;
    const updatedAnswers: Answer[] = Object.keys(definitions).map((key) => ({
      definition: definitions[key],
      questionId: flashcard.questionId,
      answerId: flashcard.answers[parseInt(key.split("_")[1])].answerId,
      image: "",
    }));
    const updatedValue: Flashcard = {
      ...flashcard,
      term: term,
      answers: updatedAnswers,
    };
    UpdateQuestion(updatedValue, updateFlashcardCallback);
    setIsEditing(false);
  };
  // Hàm để xử lý remove 1 answer khi o che do edit
  const removeDefinitionHandler = (answerId: number) => {
    RemoveAnswerInQuestion(answerId, flashcard)
      .then((updatedFlashcard) => {
        console.log(updatedFlashcard);
        updateFlashcardCallback(updatedFlashcard);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-4 py-2 w-full min-h-[3.625rem] h-[300px] bg-white rounded-md shadow-sm">
      {/* normal mode */}
      <div
        className="inline-block float-left w-[calc(100%-7rem)] h-full"
        style={{ display: isEditing ? "none" : "inline-block" }}
      >
        <div className="flex flex-row gap-2 h-full">
          <p className="flex-1 px-3 max-h-full text-left border-t-0 border-b-0 border-l-0 border-solid border-black/10 border-r-2">
            {flashcard.term}
          </p>
          <Flex
            vertical
            gap={"small"}
            className="flex-1 px-3 max-h-full text-left"
          >
            {flashcard.answers.map((answer, index) => (
              <p key={index} className="whitespace-pre-wrap">
                {answer.definition}
              </p>
            ))}
          </Flex>
        </div>
      </div>
      {/* edit mode */}
      <Form form={form} onFinish={onFormSubmit}>
        {/* <form> */}
        <div
          className="inline-block float-left w-[calc(100%-7rem)] h-full"
          style={{ display: isEditing ? "inline-block" : "none" }}
        >
          {/* <Input hidden /> */}
          <div className="flex flex-row gap-2">
            <div className="flex-1 px-3">
              <Form.Item name="term" initialValue={flashcard.term}>
                <TextArea
                  bordered={false}
                  autoSize
                  className="flex-1 px-3 max-h-[300px] overflow-auto"
                />
              </Form.Item>
              <hr className="m-0 border-2" />
            </div>
            <div className="flex-1 px-3">
              <Flex vertical gap="small">
                {flashcard.answers.map((answer, index) => (
                  <Flex justify="space-between" key={answer.answerId}>
                    <Form.Item
                      name={`definition_${index}`}
                      initialValue={answer.definition}
                    >
                      <TextArea
                        bordered={false}
                        autoSize
                        className="flex-1 px-3 max-h-[300px] overflow-auto"
                        autoFocus={true}
                      />
                    </Form.Item>
                    {}
                    <Button
                      style={{
                        display: `${
                          flashcard.answers.length === 1 && index === 0
                            ? "none"
                            : "inline-block"
                        }`,
                      }}
                      size="small"
                      shape="circle"
                      icon={
                        <IconSvg width={10} height={10} iconName="close-x" />
                      }
                      onClick={() => removeDefinitionHandler(answer.answerId)}
                    />
                  </Flex>
                ))}
              </Flex>
              <hr className="m-0 border-2" />
            </div>
          </div>
        </div>
        {/* buttons */}
        <div className="flex flex-row gap-2 h-[1.625rem] w-[6.75rem]">
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 0,
                lineWidth: 0,
              },
            }}
          >
            <Button
              shape="circle"
              size="large"
              className="hover:bg-[#edeff4] transition duration-300 ease-in-out"
              icon={
                <IconSvg
                  iconName="star-filled "
                  fill={flashcard.isStarred ? "#ffdc62" : ""}
                />
              }
              onClick={() => starredHandler(flashcard)}
            />
            <Button
              shape="circle"
              size="large"
              className="hover:bg-[#edeff4] transition duration-300 ease-in-out"
              onClick={(e) => buttonEditHandler(e)}
              htmlType="submit"
              icon={<IconSvg iconName="edit" />}
            />
          </ConfigProvider>
        </div>
        {/* </form> */}
      </Form>
    </div>
  );
};

export default FlatFlashCard;

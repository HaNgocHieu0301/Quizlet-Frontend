import { useState } from "react";
import { Flex, Button, Input, Upload, Form } from "antd";
import IconSvg from "../IconSvg";
import { Flashcard } from "~/types/Flashcard";
import { RemoveAnswerInQuestion } from "./QuestionFunctions";
const { TextArea } = Input;

const TermRow = ({
  index,
  flashcard,
  removeCallback,
  updateCallback,
}: {
  index: number;
  flashcard: Flashcard;
  removeCallback: Function;
  updateCallback: Function;
}) => {
  const [isFocusTerm, setIsFocusTerm] = useState(false);
  const [isFocusDefinition, setIsFocusDefinition] = useState(false);
  const [definitions, setDefinitions] = useState(
    flashcard.answers.map((answer) => answer.definition)
  );
  const [term, setTerm] = useState(flashcard.term);

  const handleTermChange = (e: any) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    updateCallback({ ...flashcard, term: newTerm });

    updateCallback({ ...flashcard, term: newTerm });
  };

  const addAnswerHandler = () => {
    const newDefinitions = [...definitions];
    newDefinitions.push("");
    setDefinitions(newDefinitions);
    updateCallback({
      ...flashcard,
      answers: newDefinitions.map((def, index) => ({
        questionId: flashcard.questionId,
        image: "",
        answerId:
          index + 1 > flashcard.answers.length
            ? 0
            : flashcard.answers[index].answerId,
        definition: def,
      })),
    });
  };

  const handleDefinitionChange = (index: number) => (e: any) => {
    const newDefinitions = [...definitions];
    newDefinitions[index] = e.target.value;
    setDefinitions(newDefinitions);
    // Cập nhật state của component cha với đáp án mới
    updateCallback({
      ...flashcard,
      answers: newDefinitions.map((def, index) => ({
        questionId: flashcard.questionId,
        answerId:
          index + 1 > flashcard.answers.length
            ? 0
            : flashcard.answers[index].answerId,
        definition: def,
      })),
    });
  };

  const removeAnswerInQuestion = (index: number) => {
    if (definitions.length === 1) return;
    // const newDefinitions = [...definitions];
    // newDefinitions.splice(index, 1);
    // setDefinitions(newDefinitions);
    const answerId = flashcard.answers[index].answerId;
    flashcard.answers.splice(index, 1);
    updateCallback({
      ...flashcard,
      answers: flashcard.answers.map((def, indexX) => ({
        questionId: flashcard.questionId,
        answerId: flashcard.answers[indexX].answerId,
        definition: def,
      })),
    });
    RemoveAnswerInQuestion(answerId, flashcard);
  };

  return (
    <div className="TermRow">
      <Flex className="w-full" align="flex-start">
        <div className="TermToolBar w-full">
          <div className="TermDefinition">
            <div className="p-3">
              {/* Remove Button */}
              <Flex justify="space-between" className="TermToolBar px-3">
                <span>{index}</span>
                <Button
                  icon={<IconSvg width={16} height={16} iconName="garbage" />}
                  onClick={() => removeCallback(flashcard.questionId)}
                ></Button>
              </Flex>
              <hr className="my-4 opacity-20" />
              <div className="table table-fixed min-h[3.375rem] transition w-full">
                <div className="cursor-text table-cell pt-3 px-3 align-top w-[50%] break-words z-50">
                  <div>
                    <div className="TermContent">
                      <TextArea
                        className="p-0"
                        bordered={false}
                        autoSize={true}
                        defaultValue={flashcard.term}
                        value={term}
                        onChange={handleTermChange}
                        onFocus={() => setIsFocusTerm(true)}
                        onBlur={() => setIsFocusTerm(false)}
                      />
                      <hr
                        className={`${
                          isFocusTerm ? "bg-[#ffc800]" : "bg-black"
                        } m-0`}
                      />
                      <Flex align="flex-start" className="Term">
                        <span className="text-[#939bb4] text-sm">
                          Thuat ngu
                        </span>
                      </Flex>
                    </div>
                  </div>
                </div>
                <div className="cursor-text table-cell pt-3 px-3 pr-5 align-top w-[50%] break-words z-50">
                  <div className="Content">
                    <div>
                      <Flex align="flex-start" className="DefinitionContent">
                        <div className="grow-[1]">
                          {flashcard.answers.map((answer, index) => (
                            <div key={index}>
                              <Flex justify="space-between">
                                <TextArea
                                  className="p-0"
                                  bordered={false}
                                  autoSize={true}
                                  defaultValue={answer.definition}
                                  value={definitions[index]}
                                  onChange={handleDefinitionChange(index)}
                                  onFocus={() => setIsFocusDefinition(true)}
                                  onBlur={() => setIsFocusDefinition(false)}
                                />
                                <Button
                                  shape="circle"
                                  size="small"
                                  icon={
                                    <IconSvg
                                      width={12}
                                      height={12}
                                      iconName="close-x"
                                    />
                                  }
                                  onClick={() => removeAnswerInQuestion(index)}
                                />
                              </Flex>
                              <hr
                                className={`${
                                  isFocusDefinition
                                    ? "bg-[#ffc800]"
                                    : "bg-black"
                                } m-0`}
                              />
                            </div>
                          ))}
                          <Flex align="flex-start" className="Definition">
                            <span className="text-[#939bb4] text-sm">
                              Dinh nghia
                            </span>
                          </Flex>
                        </div>
                        {/* <div>
                          <Upload
                            className="w-1/2"
                            listType="picture-card"
                            name="avatar"
                          >
                            <Flex vertical justify="center" align="center">
                              <IconSvg
                                iconName="settings"
                                width={16}
                                height={16}
                              />
                              <span>Hinh anh</span>
                            </Flex>
                          </Upload>
                        </div> */}
                      </Flex>
                    </div>
                  </div>
                  <div className="AddAnswer">
                    <Button
                      type="text"
                      className="w-full"
                      onClick={addAnswerHandler}
                    >
                      Thêm đáp án
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default TermRow;

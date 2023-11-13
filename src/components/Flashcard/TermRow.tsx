import { useState } from "react";
import { Flex, Button, Input, Upload, Form } from "antd";
import IconSvg from "../IconSvg";
import { Flashcard } from "~/types/FlashCard";
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
  };

  const addAnswerHandler = () => {
    if (definitions.length > 3) return;
    setDefinitions((definitions) => [...definitions, ""]);
    flashcard.answers.push({
      answerId: 0,
      definition: "",
      image: "",
      questionId: flashcard.questionId,
    });

    // setDefinitions(flashcard.answers)
    updateCallback({
      ...flashcard,
      answers: [...flashcard.answers],
    });
  };

  const handleDefinitionChange = (e: any, index: number) => {
    definitions[index] = e.target.value;
    console.log(definitions);

    setDefinitions((definitions) => [...definitions]);
    flashcard.answers[index].definition = definitions[index];
    // Cập nhật state của component cha với đáp án mới
    updateCallback({
      ...flashcard,
      answers: [...flashcard.answers],
    });
  };

  const removeAnswerInQuestion = (index: number) => {
    if (flashcard.answers.length === 1) return;
    // const newDefinitions = [...definitions];
    // newDefinitions.splice(index, 1);
    // setDefinitions(newDefinitions);
    const answerId = flashcard.answers[index].answerId;
    flashcard.answers.splice(index, 1);
    definitions.splice(index, 1);
    updateCallback({
      ...flashcard,
      answers: [...flashcard.answers],
    });
    if (answerId > 0) {
      RemoveAnswerInQuestion(answerId, flashcard);
    }
  };

  return (
    <Flex className="w-full mt-4" align="flex-start">
      <div className="rounded-lg bg-white">
        {/* Remove Button */}
        <Flex
          justify="space-between"
          align="center"
          className="TermToolBar py-3 px-4"
        >
          <span>{index}</span>
          <Button
            icon={<IconSvg width={16} height={16} iconName="garbage" />}
            onClick={() => removeCallback()}
          ></Button>
        </Flex>
        <hr className="opacity-30" />
        <div className="table table-fixed pt-2 min-h[3.375rem] transition w-full pb-6">
          <div className="cursor-text table-cell pt-3 px-4 align-top w-[50%] break-words z-50">
            <div>
              <div className="TermContent">
                <TextArea
                  className="px-0 mt-2"
                  bordered={false}
                  autoSize={true}
                  defaultValue={flashcard.term}
                  value={term}
                  onChange={handleTermChange}
                  onFocus={() => setIsFocusTerm(true)}
                  onBlur={() => setIsFocusTerm(false)}
                  placeholder="Enter term"
                />
                <hr
                  className={`${isFocusTerm ? "bg-[#ffc800]" : "bg-black"} m-0`}
                />
                <Flex align="flex-start" className="Term">
                  <span className="text-[#939bb4] text-sm">Term</span>
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
                        <Flex justify="space-between" align="center">
                          <TextArea
                            className="px-0 mt-2"
                            bordered={false}
                            autoSize={true}
                            defaultValue={answer.definition}
                            value={definitions[index]}
                            onChange={(e) => handleDefinitionChange(e, index)}
                            onFocus={() => setIsFocusDefinition(true)}
                            onBlur={() => setIsFocusDefinition(false)}
                            placeholder="Enter definition"
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
                            isFocusDefinition ? "bg-[#ffc800]" : "bg-black"
                          } m-0`}
                        />
                      </div>
                    ))}
                    <Flex align="flex-start" className="Definition">
                      <span className="text-[#939bb4] text-sm">
                        Description
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
            <div className="text-end">
              <Button type="primary" onClick={addAnswerHandler}>
                Thêm đáp án
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default TermRow;

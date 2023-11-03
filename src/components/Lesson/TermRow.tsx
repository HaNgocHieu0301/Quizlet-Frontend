import { useState } from "react";
import { Flex, Button, Input, Upload } from "antd";
import IconSvg from "../IconSvg";
import { Flashcard } from "~/types/FlashCard";
const { TextArea } = Input;

const TermRow = ({
  index,
  flashcard,
  removeCallback,
}: {
  index: number;
  flashcard: Flashcard;
  removeCallback: Function;
}) => {
  const [isFocusTerm, setIsFocusTerm] = useState(false);
  const [isFocusDefinition, setIsFocusDefinition] = useState(false);
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
                  onClick={() => removeCallback(flashcard.id)}
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
                        value={flashcard.term}
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
                          <TextArea
                            className="p-0"
                            bordered={false}
                            autoSize={true}
                            value={flashcard.definition}
                            onFocus={() => setIsFocusDefinition(true)}
                            onBlur={() => setIsFocusDefinition(false)}
                          />
                          <hr
                            className={`${
                              isFocusDefinition ? "bg-[#ffc800]" : "bg-black"
                            } m-0`}
                          />
                          <Flex align="flex-start" className="Definition">
                            <span className="text-[#939bb4] text-sm">
                              Dinh nghia
                            </span>
                          </Flex>
                        </div>
                        <div>
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
                        </div>
                      </Flex>
                    </div>
                  </div>
                  <div className="AddAnswer"></div>
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

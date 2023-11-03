import ReactDOM from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import IconSvg from "../IconSvg";
import Icons from "~/assets/icons";
import { Button, Flex, Input } from "antd";
import TermRow from "../Lesson/TermRow";
import ImportModal from "./ImportModal";
import { Flashcard } from "~/types/FlashCard";
import { JsxElement } from "typescript";
const flashcardsConstants: Array<Flashcard> = [
  {
    id: 1,
    term: "1",
    definition: "1",
    isStarred: false,
  },
  {
    id: 2,
    term: "front content 2",
    definition: "back content 2",
    isStarred: false,
  },
  {
    id: 3,
    term: "front content 3",
    definition: "back content 3",
    isStarred: false,
  },
  {
    id: 4,
    term: "front content 4",
    definition: "back content 4",
    isStarred: false,
  },
];

const EditingMode = () => {
  const [isFocusTitle, setIsFocusTitle] = useState(false);
  const [isFocusDescription, setIsFocusDescription] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]); // [ [word, definition], [word, definition
  const flashcardListRef = useRef<HTMLDivElement>(null);
  const importedCallback = (lst: Flashcard[]) => {
    for (let i = 0; i < lst.length; i++) {
      lst[i].id = flashcards.length + 1 + i;
    }
    const tmp = flashcards.concat(lst);
    setIsOpenImportModal(false);
    setFlashcards(tmp);
  };

  const removeFlashcardCallback = (id: number) => {
    const tmp = flashcards.filter((flashcard) => flashcard.id !== id);
    setFlashcards(tmp);
  };

  const swapTermAndDefinitionHandler = () => {
    console.log("swap");
    const tmp = flashcards.map((flashcard) => {
      return {
        id: flashcard.id,
        term: flashcard.definition,
        definition: flashcard.term,
        isStarred: flashcard.isStarred,
      };
    });
    console.log(tmp);
    setFlashcards(tmp);
  };

  const addNewLineHandler = () => {
    let tmp = [
      ...flashcards,
      { id: flashcards.length + 1, term: "", definition: "", isStarred: false },
    ];
    setFlashcards(tmp);
  };
  useEffect(() => {
    if (flashcards.length === 0) {
      setFlashcards([...flashcardsConstants]);
    }
  }, [flashcards]);

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
                        <Button size="middle" type="primary">
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
                    <div ref={flashcardListRef}>
                      {flashcards.map((flashcard, index) => (
                        <TermRow
                          index={index + 1}
                          flashcard={{
                            id: flashcard.id,
                            term: flashcard.term,
                            definition: flashcard.definition,
                            isStarred: false,
                          }}
                          removeCallback={removeFlashcardCallback}
                        />
                      ))}
                    </div>
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

export default EditingMode;

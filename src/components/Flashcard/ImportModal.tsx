import { Button, Flex, Form, Input, Radio, ConfigProvider, Modal } from "antd";
import { useState, useRef, useEffect } from "react";
import { Flashcard } from "~/types/FlashCard";
const { TextArea } = Input;

const ImportModal = ({
  isOpen,
  closeHandler,
  importedCallback,
}: {
  isOpen: boolean;
  closeHandler: Function;
  importedCallback: Function;
}) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]); // [ [word, definition], [word, definition]
  const [importedValue, setImportedValue] = useState("");
  useEffect(() => {
    if (importedValue !== "") {
      const res = SplitFlashcard(importedValue, "`", "~");
      setFlashcards(res);
    } else {
      setFlashcards([]);
    }
  }, [importedValue]);
  const textAreaRef = useRef<any>(null);
  const ImportHandler = (importedLst: Flashcard[]) => {
    setImportedValue("");
    importedCallback(importedLst);
  };

  return (
    <Modal
      closeIcon={false}
      open={isOpen}
      width={1000}
      centered
      title={<TitleModal closeHandler={closeHandler} />}
      footer={null}
    >
      <div className="bg-[#f6f7fb]">
        <div className="bg-white">
          <div className="px-10 pb-6">
            {/* importing input */}
            <div>
              <div className="mt-6 mb-3">
                <span className="font-bold">Nhap du lieu. </span>
                <span>
                  Chep va dan du lieu o day (tu word, excel, google docs)
                </span>
              </div>
              <Form>
                <Form.Item name="flashcardList">
                  <ConfigProvider
                    theme={{
                      token: {},
                      components: {
                        Input: {
                          hoverBorderColor: "#ffcd1f",
                          activeBorderColor: "#ffcd1f",
                        },
                      },
                    }}
                  >
                    <TextArea
                      ref={textAreaRef}
                      rows={4}
                      className="border-2 min-h-[200px]"
                      placeholder={`Từ 1 \t Định nghĩa 1 \nTừ 2 \t Định nghĩa 2 \nTừ 3 \t Định nghĩa 3`}
                      onChange={(e) => {
                        setImportedValue(e.currentTarget.value);
                      }}
                      value={importedValue}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Form>
            </div>
            {/* setting options to import */}
            <Flex justify="space-between" className="w-full">
              <div className="grid md:grid-cols-2 grid-cols-1">
                <div>
                  <div>
                    <span>Giữa thuật ngữ và định nghĩa</span>
                  </div>
                  <Radio.Group name="radiogroup" defaultValue={1}>
                    <Flex align="center" justify="center">
                      <Radio value={1}>Tab</Radio>
                      <Radio value={2}>Phẩy</Radio>
                      <Radio value={4}>
                        <div className="w-full">
                          <Input
                            bordered={false}
                            className="p-0 flex flex-col"
                          />
                          <hr />
                          <Flex align="flex-start" className="">
                            <div className="text-[#939bb4] font-semibold text-[0.75rem] uppercase border-t-2 border-[#ffcd1f]">
                              Tùy Chỉnh
                            </div>
                          </Flex>
                        </div>
                      </Radio>
                    </Flex>
                  </Radio.Group>
                </div>
                <div>
                  <div>
                    <span>Giữa các thẻ</span>
                  </div>
                  <Radio.Group name="radiogroup" defaultValue={1}>
                    <Flex align="center" justify="center">
                      <Radio value={1}>Tab</Radio>
                      <Radio value={2}>Chấm phẩy</Radio>
                      <Radio value={4}>
                        <div className="w-full">
                          <Input
                            bordered={false}
                            className="p-0 flex flex-col"
                          />
                          <hr />
                          <Flex align="flex-start" className="">
                            <div className="text-[#939bb4] font-semibold text-[0.75rem] uppercase border-t-2 border-[#ffcd1f]">
                              Tùy Chỉnh
                            </div>
                          </Flex>
                        </div>
                      </Radio>
                    </Flex>
                  </Radio.Group>
                </div>
              </div>
              {/* Import Button */}
              <ConfigProvider
                theme={{
                  token: {
                    controlHeightLG: 60,
                  },
                  components: {
                    Button: {
                      paddingInlineLG: "80",
                      defaultBg: "#3ccfcf",
                      defaultColor: "#fff",
                    },
                  },
                }}
              >
                <Button
                  size="large"
                  disabled={importedValue === "" ? true : false}
                  className="py-6 h-[60px]"
                  onClick={() => ImportHandler(flashcards)}
                >
                  <span className="font-semibold">Nhập</span>
                </Button>
              </ConfigProvider>
            </Flex>
          </div>
        </div>
        {/* preview when importing */}
        <div className="pt-6">
          <div className="px-10 mb-10">
            <h4 className="text-lg font-bold leading-tight m-0">
              <span>
                Xem trước <span>2 thẻ</span>
              </span>
            </h4>
            <div style={{ display: importedValue === "" ? "block" : "none" }}>
              <span>Không có nội dung để xem trước</span>
            </div>
            {flashcards.map((flashcard) => (
              <FlashCardPreview flashcard={flashcard} index={1} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const TitleModal = ({ closeHandler }: { closeHandler: Function }) => {
  return (
    <div className="pt-10 px-10">
      <button
        className="bg-white border-t-0 border-l-0 border-r-0 cursor-pointer font-bold border-b-4 border-b-[#3ccfcf] hover:text-[#ffcd1f] hover:border-b-yellow-400 py-2 px-0"
        onClick={() => closeHandler()}
      >
        <span>Huy Nhap</span>
      </button>
    </div>
  );
};

const FlashCardPreview = ({
  flashcard,
  index,
}: {
  flashcard: Flashcard;
  index: number;
}) => {
  return (
    <Flex align="center" className="mt-5 p-4 bg-white">
      <div className="w-10 text-center">{index}</div>
      <div className="table min-h-[3.375rem] table-fixed w-full p-1">
        <div className="cursor-text table-cell w-1/2 align-top pt-3 pl-3 pr-5">
          {flashcard.term}
          <hr className="my-1" />
          <span className="flex justify-between items-center font-semibold text-[0.75rem] space-x-[0.0625rem] text-inherit uppercase text-[#939bb4]">
            Thuật ngữ
          </span>
        </div>
        <div className="cursor-text table-cell w-1/2 align-top pt-3 pl-5 pr-3">
          {flashcard.answers.map((answer, index) => (
            <>
              <span key={index}>{answer.definition}</span>
              <br />
            </>
          ))}
          <hr />
          <span>Định nghĩa</span>
        </div>
      </div>
    </Flex>
  );
};

const SplitFlashcard = (str: string, inside: string, between: string) => {
  // Tách chuỗi thành mảng các từ bằng s2
  const words = str.split(between);

  // Tạo mảng kết quả để lưu kết quả chia từng từ
  const result: Flashcard[] = [];

  // Duyệt qua từng từ
  for (const word of words) {
    // Tách từ thành mảng con chứa thuật ngữ và định nghĩa bằng s1
    const parts = word.split(inside);
    var flashcard: Flashcard = {
      learningStatusId: 1,
      questionId: 1,
      term: parts[0],
      answers: [
        { image: "", definition: parts[1], questionId: 1, answerId: 1 },
      ],
      lessonId: 1,
      isStarred: false,
    };
    // Thêm mảng con vào mảng kết quả
    result.push(flashcard);
  }
  return result;
};

export default ImportModal;

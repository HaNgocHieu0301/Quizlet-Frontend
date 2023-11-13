import { useState, createRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LearningModeButton from "../../components/Flashcard/LearningModeButton";
import Icons from "../../assets/icons";
import IconSvg from "../../components/IconSvg";
import FlatFlashCard from "../../components/Flashcard/FlatFlashCard";
import ReactCardFlipCustom from "../../components/Flashcard/ReactCardFlipCustom";
import { Flashcard } from "~/types/FlashCard";
import { Button, Carousel, ConfigProvider, Flex } from "antd";
import { CarouselRef } from "antd/es/carousel";
import OptionButtons from "../../components/Flashcard/OptionButtons";
import SettingModal from "~/components/Flashcard/SettingModal";
import axios from "axios";
import { fetchFlashcardsByLessonId } from "~/components/Flashcard/QuestionFunctions";

const Lesson = () => {
  const { lessonId } = useParams();
  const lessonIdNum: number = parseInt(lessonId as string);
  let navigate = useNavigate();
  const [flashcardsConstant, setFlashcardsConstant] = useState<Flashcard[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [starredFlashcards, setStarredFlashcards] = useState<Flashcard[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
  const carouseRef = createRef<CarouselRef>();

  const ChangePreviewFlashCard = (index: number) => {
    if (index < flashcards.length && index >= 0) {
      carouseRef.current?.goTo(index);
      setActiveIndex(index);
    }
  };
  /**
   * update flashcard list to re-render
   * @param updatedFlashcard
   */
  const updateFlashcardCallback = (updatedFlashcard: Flashcard) => {
    console.log("updateFlashcardCallback");
    console.log(updatedFlashcard);
    const updatedFlashcards = flashcards.map((flashcard) =>
      flashcard.questionId === updatedFlashcard.questionId
        ? updatedFlashcard
        : flashcard
    );
    var tmp = flashcards.find(
      (flashcard) => flashcard.questionId === updatedFlashcard.questionId
    );
    if (tmp !== undefined) {
      tmp.isStarred = updatedFlashcard.isStarred;
      console.log(flashcards);
    }
    setFlashcards((flashcards) => [...updatedFlashcards]);
  };
  const ChangeToStarredFlashcards = () => {
    const starredFlashcards = flashcards.filter((o) => o.isStarred);
    console.log(starredFlashcards);
    setFlashcards(starredFlashcards);
    setIsStarred(true);
  };
  const ChangeToAllFlashcards = () => {
    setFlashcards(flashcardsConstant);
    setIsStarred(false);
  };
  const handleChangeEditingMode = () => {
    navigate("/Lesson/EditingMode");
  };

  useEffect(() => {
    const lessonIdNum: number = parseInt(lessonId as string);
    if (flashcards.length === 0) {
      fetchFlashcardsByLessonId(lessonIdNum).then((flashcards) => {
        if (Array.isArray(flashcards)) {
          setFlashcards(flashcards);
          setFlashcardsConstant(flashcards);
        }
      });
    }
    const tmp = flashcards.filter((flashcard) => flashcard.isStarred);
    setStarredFlashcards(tmp);
  }, [flashcards, lessonId]);
  return (
    <>
      <div className="w-full pb-8">
        <div className="bg-[#f6f7fb] max-w-[50rem] mx-auto my-0 px-10 pt-6">
          <div className="Intro">
            <div className="Title flex flex-col gap-2 mb-4">
              <h1 className="font-bold text-3xl text-start">MLN111</h1>
              {/* statistic and review */}
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-2">
                  <IconSvg iconName="upward-graph" />
                  <span>134 nguoi hoc trong 3 ngay qua</span>
                </div>
                <div className="flex flex-row gap-2">
                  <IconSvg
                    iconName="star-filled"
                    color="#ffcd1f"
                    fill="#ffcd1f"
                  />
                  <span>4.7 (3 danh gia)</span>
                </div>
              </div>
            </div>
            {/* learning mode options */}
            <div className="LearningMode mb-6">
              <section>
                <h2 className="mb-4 text-sm font-bold text-start">
                  Hoat dong tu hoc
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  <LearningModeButton
                    title="Thẻ ghi nhớ"
                    iconName="study-flashcards-twilight"
                    lessonId={lessonIdNum}
                    url={`/Lesson/FlashcardMode/${lessonIdNum}`}
                  />
                  <LearningModeButton
                    title="Học"
                    iconName="study-learn-twilight"
                    lessonId={lessonIdNum}
                    url={`/Lesson/LearningMode/${lessonIdNum}`}
                  />
                  <LearningModeButton
                    title="Kiểm tra"
                    iconName="mode-test-2022"
                    lessonId={lessonIdNum}
                    url={`/Lesson/TestMode/${lessonIdNum}`}
                  />
                  <LearningModeButton
                    title="Ghép thẻ"
                    iconName="mode-match-2022"
                    lessonId={lessonIdNum}
                    url={`/Lesson/TestMode/${lessonIdNum}`}
                  />
                </div>
              </section>
            </div>
            {/* flashcard preview */}
            <div className="Preview flex flex-col gap-1">
              <Carousel ref={carouseRef} dots={false} className="shadow-md">
                {flashcards.map((flashcard, index) => {
                  return (
                    <ReactCardFlipCustom key={index} flashcard={flashcard} />
                  );
                })}
              </Carousel>
            </div>
            {/* flashcards navigation buttons */}
            <div className="flex flex-row justify-between items-center my-4">
              <Button
                size="large"
                shape="circle"
                className="hover:bg-[#edeff4] transition duration-300 ease-in-out"
                icon={<IconSvg iconName="shuffle" />}
              />
              <Flex justify="center" align="center" gap={"middle"}>
                <Button
                  size="large"
                  shape="circle"
                  className={`"hover:bg-[#edeff4] transition duration-300 ease-in-out "`}
                  disabled={activeIndex === 0 ? true : false}
                  onClick={() => ChangePreviewFlashCard(activeIndex - 1)}
                  icon={
                    <IconSvg
                      iconName="arrow-left"
                      fill={activeIndex === 0 ? "#d9dde8" : "#18AE79"}
                    />
                  }
                />
                <p className="flex flex-row items-center">
                  <span>{activeIndex + 1}</span>/
                  <span>{flashcards.length}</span>
                </p>
                <Button
                  size="large"
                  shape="circle"
                  className={`"hover:bg-[#edeff4] transition duration-300 ease-in-out "`}
                  disabled={
                    activeIndex === flashcards.length - 1 ? true : false
                  }
                  onClick={() => ChangePreviewFlashCard(activeIndex + 1)}
                  icon={
                    <IconSvg
                      iconName="arrow-right"
                      fill={
                        activeIndex === flashcards.length - 1
                          ? "#d9dde8"
                          : "#18AE79"
                      }
                    />
                  }
                />
              </Flex>
              <Flex gap={"small"}>
                <Button
                  size="large"
                  shape="circle"
                  icon={<IconSvg iconName="settings" />}
                  className="hover:bg-[#edeff4] transition duration-300 ease-in-out"
                  onClick={() => setIsSettingModalVisible(true)}
                />
                <Button
                  size="large"
                  shape="circle"
                  icon={<IconSvg iconName="fullscreen" />}
                  className="hover:bg-[#edeff4] transition duration-300 ease-in-out"
                />
              </Flex>
            </div>
          </div>
          <div className="Detail">
            <div className="Detail-Info flex flex-col justify-start gap-2 py-8">
              <div className="Header flex flex-row justify-between">
                <div className="UserInfo flex flex-row">
                  <div className="Avatar">
                    <IconSvg iconName="share-ios" width={50} height={50} />
                  </div>
                  <div className="Name">
                    <h2>Ha Ngoc Hieu</h2>
                  </div>
                </div>
                <OptionButtons />
              </div>
              <h4 className="Description text-start">
                Chapter 123 da sua noi dung
              </h4>
            </div>
            <div className="Detail-Content">
              <ConfigProvider
                theme={{
                  token: {
                    colorBgTextHover: "#f6f7fb",
                    borderRadius: 0,
                    paddingContentHorizontal: 0,
                  },
                }}
              >
                <div className="Header flex flex-row justify-between items-center gap-4">
                  <h2 className="text-lg font-bold">
                    Thuat ngu trong hoc phan nay (408){" "}
                  </h2>
                  <Flex justify="space-between" align="center">
                    <Button
                      type="text"
                      className={`mx-2 border-b-2 border-b-transparent hover:border-b-[#423ed8] transition duration-150 ease-in-out cursor-pointer 
                      ${isStarred ? "dm" : "border-b-[#423ed8]"}`}
                      onClick={() => ChangeToAllFlashcards()}
                    >
                      <span>Tat Ca</span>
                    </Button>
                    <Button
                      type="text"
                      className={`mx-2 border-b-2 border-b-transparent hover:border-b-[#423ed8] transition duration-150 ease-in-out cursor-pointer ${
                        isStarred ? "border-b-[#423ed8]" : ""
                      }`}
                      onClick={() => ChangeToStarredFlashcards()}
                    >
                      <span>
                        Gan dau sao <span>({starredFlashcards.length})</span>{" "}
                      </span>
                    </Button>
                    <Button
                      type="text"
                      className="flex flex-row justify-start items-center"
                      icon={
                        <IconSvg width={16} height={16} iconName="caret-down" />
                      }
                    >
                      <span>Thong so cua ban</span>
                    </Button>
                  </Flex>
                </div>
              </ConfigProvider>
              <div className="Progress flex flex-row justify-between my-5">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-yellow-600 text-start">
                    Dang hoc (216)
                  </h2>
                  <h3>
                    Ban da bat dau hoc nhung thuat ngu nay. Tiep tuc phat huy
                    nhe!
                  </h3>
                </div>
                <Button className="flex flex-row justify-center items-center border-4 border-[#d9dde8] rounded-md p-2">
                  <IconSvg iconName="star-empty" />
                  <span className="hover:text-[#ffcd1f]">Chon 216</span>
                </Button>
              </div>
              <div className="MainContent bg-[#f6f7fb] p-2">
                {flashcards.map((flashcard, index) => (
                  <FlatFlashCard
                    key={index}
                    flashcard={flashcard}
                    updateFlashcardCallback={updateFlashcardCallback}
                  />
                ))}
              </div>
              <div className="">
                <ConfigProvider
                  theme={{
                    token: {
                      controlHeightLG: 60,
                    },
                    components: {
                      Button: {
                        paddingInlineLG: "80",
                      },
                    },
                  }}
                >
                  {flashcards.length > 50 && (
                    <Button
                      type="primary"
                      size="large"
                      className="py-6 h-[60px]"
                    >
                      <Link
                        to={`/Lesson/EditingMode/${lessonIdNum}`}
                        className="text-lg"
                      >
                        Xem thêm
                      </Link>
                    </Button>
                  )}
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingModal
        isVisible={isSettingModalVisible}
        modalHandler={setIsSettingModalVisible}
      />
      <Icons />
    </>
  );
};

export default Lesson;

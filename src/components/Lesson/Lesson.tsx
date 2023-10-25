import { useState, createRef } from "react";
import LearningModeButton from "./LearningModeButton";
import Icons from "../../assets/icons";
import IconSvg from "../IconSvg";
import FlatFlashCard from "./FlatFlashCard";
import ReactCardFlipCustom from "./ReactCardFlipCustom";
import { Flashcard } from "~/types/FlashCard";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import DropdownMoreOptions from "./OptionButtons";
import OptionButtons from "./OptionButtons";

const flashcards: Array<Flashcard> = [
  {
    id: 1,
    frontContent: "1",
    backContent: "1",
  },
  {
    id: 2,
    frontContent: "front content 2",
    backContent: "back content 2",
  },
  {
    id: 3,
    frontContent: "front content 3",
    backContent: "back content 3",
  },
  {
    id: 4,
    frontContent: "front content 4",
    backContent: "back content 4",
  },
];

const Lesson = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouseRef = createRef<CarouselRef>();

  const ChangePreviewFlashCard = (index: number) => {
    if (index < flashcards.length && index >= 0) {
      carouseRef.current?.goTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="bg-[#f6f7fb] max-w-[50rem] mx-auto my-0 px-10 pt-6">
          <div className="Intro">
            <div className="Title flex flex-col gap-2 mb-4">
              <h1 className="font-bold text-3xl text-start">MLN111</h1>
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
            <div className="LearningMode mb-6">
              <section>
                <h2 className="mb-4 text-sm font-bold text-start">
                  Hoat dong tu hoc
                </h2>
                <ul className="flex flex-row gap-2 justify-between">
                  <LearningModeButton
                    title="The ghi nho"
                    iconName="study-flashcards-twilight"
                  />
                  <LearningModeButton
                    title="The ghi nho"
                    iconName="study-learn-twilight"
                  />
                  <LearningModeButton
                    title="The ghi nho"
                    iconName="mode-test-2022"
                  />
                  <LearningModeButton
                    title="The ghi nho"
                    iconName="mode-match-2022"
                  />
                </ul>
              </section>
            </div>
            <div className="Preview flex flex-col gap-1">
              <div className="shadow-lg py-14 px-10 bg-white">
                <Carousel ref={carouseRef}>
                  {flashcards.map((flashcard) => {
                    return <ReactCardFlipCustom flashcard={flashcard} />;
                  })}
                </Carousel>
              </div>
              <div className="flex flex-row justify-between items-center shadow-lg py-4">
                <div className="flex flex-row">
                  <button className="w-10 h-10 rounded-[50%] border-2 mx-2 hover:bg-[#edeff4] transition duration-300 ease-in-out">
                    <IconSvg iconName="shuffle" />
                  </button>
                </div>
                <div className="flex flex-row">
                  <button
                    className={`"w-10 h-10 rounded-[50%] border-2 mx-2 hover:bg-[#edeff4] transition duration-300 ease-in-out " +${
                      activeIndex === flashcards.length - 1
                        ? " cursor-default"
                        : " cursor-pointer"
                    }`}
                    onClick={() => ChangePreviewFlashCard(activeIndex - 1)}
                  >
                    <IconSvg
                      iconName="arrow-left"
                      fill={activeIndex === 0 ? "#d9dde8" : "#18AE79"}
                    />
                  </button>
                  <p className="flex flex-row items-center">
                    <span>{activeIndex + 1}</span>/<span>20</span>
                  </p>
                  <button
                    className={`"w-10 h-10 rounded-[50%] border-2 mx-2 hover:bg-[#edeff4] transition duration-300 ease-in-out " + ${
                      activeIndex === flashcards.length - 1
                        ? "cursor-default"
                        : "cursor-pointer"
                    }`}
                    onClick={() => ChangePreviewFlashCard(activeIndex + 1)}
                  >
                    <IconSvg
                      iconName="arrow-right"
                      fill={
                        activeIndex === flashcards.length - 1
                          ? "#d9dde8"
                          : "#18AE79"
                      }
                    />
                  </button>
                </div>
                <div className="flex flex-row">
                  <button className="w-10 h-10 rounded-[50%] border-2 mx-2 hover:bg-[#edeff4] transition duration-300 ease-in-out">
                    <IconSvg iconName="setting" />
                  </button>
                  <button className="w-10 h-10 rounded-[50%] border-2 mx-2 hover:bg-[#edeff4] transition duration-300 ease-in-out">
                    <IconSvg iconName="fullscreen" />
                  </button>
                </div>
              </div>
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
              <div className="Header flex flex-row justify-between items-center">
                <h2 className="text-lg font-bold">
                  Thuat ngu trong hoc phan nay (408){" "}
                </h2>
                <div className="flex flex-row justify-end items-center">
                  <button className="mr-5 border-b-4 border-b-transparent hover:border-b-[#423ed8] transition duration-150 ease-in-out cursor-pointer">
                    Tat Ca
                  </button>
                  <button className="mr-5 border-b-4 border-b-transparent hover:border-b-[#423ed8] transition duration-150 ease-in-out cursor-pointer">
                    Gan dau sao
                  </button>
                  <button className="flex flex-row items-center justify-center border-b-4 border-b-transparent hover:border-b-[#423ed8] transition duration-150 ease-in-out cursor-pointer">
                    <span>Thong so cua ban</span>
                    <IconSvg iconName="caret-down" />
                  </button>
                </div>
              </div>
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
                <button className="flex flex-row justify-center items-center border-4 border-[#d9dde8] rounded-md p-2">
                  <IconSvg iconName="star-empty" />
                  <span className="hover:text-[#ffcd1f]">Chon 216</span>
                </button>
              </div>
              <div className="MainContent my-10 bg-white p-2">
                <FlatFlashCard />
                <FlatFlashCard />
                <FlatFlashCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Icons />
    </>
  );
};

export default Lesson;

// import { Layout, Flex, Button, Dropdown } from "antd";
import { useState, createRef } from "react";
import { Dropdown, Button, Flex } from "antd";
import IconSvg from "../IconSvg";
import Icons from "~/assets/icons";
// const { Header, Content } = Layout;
import { Carousel } from "antd";
import ReactCardFlipCustom from "../Lesson/ReactCardFlipCustom";
import { CarouselRef } from "antd/es/carousel";
import { Flashcard } from "~/types/FlashCard";
import ModeHeader from "./ModeHeader";

const flashcards: Array<Flashcard> = [
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
const FlashCardMode = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouseRef = createRef<CarouselRef>();

  const ChangePreviewFlashCard = (index: number) => {
    if (index < flashcards.length && index >= 0) {
      carouseRef.current?.goTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-[#f6f7fb] w-full h-[100vh]">
      {/* <div className="sticky top-0 z-10 w-full flex items-center bg-white"> */}
      <ModeHeader />
      <div className="mt-6 mx-4">
        <Flex
          vertical
          gap={"large"}
          className="Preview max-w-[53rem] mx-auto my-0"
        >
          <Carousel
            ref={carouseRef}
            dots={false}
            className="bg-white rounded-lg shadow-lg"
          >
            {flashcards.map((flashcard) => {
              return <ReactCardFlipCustom flashcard={flashcard} />;
            })}
          </Carousel>
          <Flex
            justify="space-between"
            gap={"large"}
            className="items-centershadow-lg py-4 w-full"
          >
            <div />
            <Flex gap={"large"}>
              <Button
                size="large"
                shape="circle"
                disabled={activeIndex === 0}
                icon={
                  <IconSvg
                    iconName="arrow-left"
                    fill={activeIndex === 0 ? "#d9dde8" : "#18AE79"}
                  />
                }
                onClick={() => ChangePreviewFlashCard(activeIndex - 1)}
              />
              <Button
                size="large"
                shape="circle"
                disabled={activeIndex === flashcards.length - 1}
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
                onClick={() => ChangePreviewFlashCard(activeIndex + 1)}
              />
            </Flex>
            <Button
              size="middle"
              shape="circle"
              icon={<IconSvg width={20} height={20} iconName="shuffle" />}
            />
          </Flex>
        </Flex>
      </div>
      <Icons />
    </div>
  );
};

export default FlashCardMode;

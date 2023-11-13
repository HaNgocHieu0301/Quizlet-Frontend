// import { Layout, Flex, Button, Dropdown } from "antd";
import { useState, createRef, useEffect } from "react";
import { Dropdown, Button, Flex } from "antd";
import IconSvg from "../../components/IconSvg";
import Icons from "~/assets/icons";
// const { Header, Content } = Layout;
import { Carousel } from "antd";
import ReactCardFlipCustom from "../../components/Flashcard/ReactCardFlipCustom";
import { CarouselRef } from "antd/es/carousel";
import { Flashcard } from "~/types/FlashCard";
import ModeHeader from "../../components/Flashcard/ModeHeader";
import { fetchFlashcardsByLessonId } from "~/components/Flashcard/QuestionFunctions";
import { useParams } from "react-router-dom";

const FlashCardMode = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lessonIdNum: number = parseInt(lessonId as string);
  const [flashcardsCst, setFlashcardsCst] = useState<Flashcard[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouseRef = createRef<CarouselRef>();

  const ChangePreviewFlashCard = (index: number) => {
    if (index < flashcards.length && index >= 0) {
      carouseRef.current?.goTo(index);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    fetchFlashcardsByLessonId(lessonIdNum).then((fetchedFlashcards) => {
      if (Array.isArray(fetchedFlashcards)) {
        setFlashcards(fetchedFlashcards);
      }
    });
    // setFlashcards(tmp);
  }, [flashcards]);
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

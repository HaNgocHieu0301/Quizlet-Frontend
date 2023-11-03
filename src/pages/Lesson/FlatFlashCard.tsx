import { useEffect, useState } from "react";
import IconSvg from "../IconSvg";
import { Button, ConfigProvider, Input } from "antd";
import { Flashcard } from "~/types/FlashCard";
const { TextArea } = Input;

const FlatFlashCard = ({
  flashcard,
  starredCallback,
}: {
  flashcard: Flashcard;
  starredCallback: Function;
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [isStarred, setIsStarred] = useState(false);
  useEffect(() => {
    console.log("flashcard useEffect");
    setIsStarred(flashcard.isStarred);
  });

  const starredHandler = (fc: Flashcard) => {
    setIsStarred(!isStarred);
    starredCallback(fc.id);
  };

  return (
    <div className="my-4 py-2 w-full min-h-[3.625rem] h-[300px] bg-white rounded-md shadow-sm">
      {/* normal mode */}
      <div
        className="inline-block float-left w-[calc(100%-7rem)] h-full"
        style={{ display: isEditing ? "inline-block" : "none" }}
      >
        <div className="flex flex-row gap-2 h-full">
          <p className="flex-1 px-3 max-h-full text-left border-t-0 border-b-0 border-l-0 border-solid border-black/10 border-r-2">
            {flashcard.term}
          </p>
          <p className="flex-1 px-3 max-h-full text-left">
            {flashcard.definition}
          </p>
        </div>
      </div>
      {/* edit mode */}
      <form ref={}>
        <div
          className="inline-block float-left w-[calc(100%-7rem)] h-full"
          style={{ display: isEditing ? "none" : "inline-block" }}
        >
          <Input hidden />
          <div className="flex flex-row gap-2">
            <div className="flex-1 px-3">
              <TextArea
                bordered={false}
                autoSize
                className="flex-1 px-3 max-h-[300px] overflow-auto"
                defaultValue={flashcard.term}
              />
              <hr className="m-0 border-2" />
            </div>
            <div className="flex-1 px-3">
              <TextArea
                bordered={false}
                autoSize
                className="flex-1 px-3 max-h-[300px] overflow-auto"
                defaultValue={flashcard.definition}
                autoFocus={true}
              />
              <hr className="m-0 border-2" />
            </div>
            I
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
                  fill={isStarred ? "#ffdc62" : ""}
                />
              }
              onClick={() => starredHandler(flashcard)}
            />
            <Button
              shape="circle"
              size="large"
              className="hover:bg-[#edeff4] transition duration-300 ease-in-out"
              onClick={() => setIsEditing(!isEditing)}
              icon={<IconSvg iconName="edit" />}
            />
          </ConfigProvider>
        </div>
      </form>
    </div>
  );
};

export default FlatFlashCard;

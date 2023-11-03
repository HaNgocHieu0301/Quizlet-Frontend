import IconSvg from "../IconSvg";
import { Flex } from "antd";
interface LearningModeButtonProps {
  title: string;
  iconName: string;
}

const LearningModeButton = ({ title, iconName }: LearningModeButtonProps) => {
  return (
    <div>
      <a
        href="#Id"
        className="flex flex-row gap-2 pl-4 pr-6 py-2 rounded-xl bg-white shadow-md shadow-gray-100 
        hover:shadow-gray-300 
        border-b-4
        hover:border-b-[#dbdfff]
        transition duration-150 ease-in-out cursor-pointer no-underline"
      >
        <Flex align="center" gap={"middle"}>
          <IconSvg width={30} height={30} iconName={iconName} />
          <span className="font-semibold text-black">{title}</span>
        </Flex>
      </a>
    </div>
  );
};

export default LearningModeButton;

import { Dropdown } from "antd";
// import Icons from "../../assets/icons";
import IconSvg from "../IconSvg";
const OptionButtons = () => {
  return (
    <div className="Options flex flex-row justify-end gap-3">
      <button className="flex flex-row justify-center items-center shadow-sm border-4 border-[#d9dde8] px-2 rounded-lg hover:bg-[#edeff4] transition duration-300 ease-in-out">
        <IconSvg iconName="share-ios" />
        <span>Chia se</span>
      </button>
      <button className="flex flex-row justify-center items-center shadow-sm border-4 border-[#d9dde8] px-2 rounded-lg hover:bg-[#edeff4] transition duration-300 ease-in-out">
        <IconSvg iconName="copy" />
      </button>
      <Dropdown
        trigger={["click"]}
        placement="topRight"
        dropdownRender={(menu) => (
          <div className="w-[250px] bg-white shadow-sm">
            <button className="w-full h-12 flex flex-row justify-start items-center px-2 hover:bg-[#edeff4] transition duration-300 ease-in-out">
              <IconSvg iconName="more-horizontal" />
              <span>Xóa</span>
            </button>
            <button className="w-full h-12 flex flex-row justify-start items-center px-2 hover:bg-[#edeff4] transition duration-300 ease-in-out">
              <IconSvg iconName="more-horizontal" />
              <span>Xuất</span>
            </button>
            <button className="w-full h-12 flex flex-row justify-start items-center px-2 hover:bg-[#edeff4] transition duration-300 ease-in-out">
              <IconSvg iconName="more-horizontal" />
              <span>Lưu và chỉnh sửa</span>
            </button>
          </div>
        )}
      >
        <button className="flex flex-row justify-center items-center shadow-sm border-4 border-[#d9dde8] px-2 rounded-lg hover:bg-[#edeff4] transition duration-300 ease-in-out">
          <IconSvg iconName="more-horizontal" />
        </button>
      </Dropdown>
    </div>
  );
};

export default OptionButtons;

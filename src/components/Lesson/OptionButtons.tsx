import { Button, ConfigProvider, Dropdown } from "antd";
// import Icons from "../../assets/icons";
import IconSvg from "../IconSvg";
const OptionButtons = () => {
  return (
    // bg: #f6f7fb
    // border: #d9dde8
    // hover:bg: #edeff4
    <ConfigProvider
      theme={{
        token: {
          lineWidth: 2,
          colorText: "#586380",
        },
        components: {
          Button: {
            defaultBg: "#f6f7fb",
            defaultBorderColor: "#d9dde8",
          },
        },
      }}
    >
      <div className="Options flex flex-row justify-end gap-3">
        <Button
          size="large"
          className="flex flex-row justify-start items-center"
          icon={<IconSvg iconName="share-ios" fill="#586380" />}
        >
          <span>Chia se</span>
        </Button>
        <Button
          size="large"
          icon={<IconSvg iconName="edit" fill="#586380" />}
        />
        <Dropdown
          trigger={["click"]}
          placement="topRight"
          dropdownRender={(menu) => (
            <div className="w-[250px] bg-white shadow-sm">
              <Button
                type="text"
                // className="w-full h-12 flex flex-row justify-start items-center px-2 hover:bg-[#edeff4] transition duration-300 ease-in-out"
                className="flex flex-row justify-start items-center w-full h-12"
                icon={<IconSvg iconName="garbage  " fill="#586380" />}
              >
                <span>Xóa</span>
              </Button>
              <Button
                type="text"
                className="flex flex-row justify-start items-center w-full h-12"
                icon={<IconSvg iconName="more-horizontal" fill="#586380" />}
              >
                <span>Xuất</span>
              </Button>
              <Button
                type="text"
                className="flex flex-row justify-start items-center w-full h-12"
                icon={<IconSvg iconName="copy" fill="#586380" />}
              >
                <span>Lưu và chỉnh sửa</span>
              </Button>
            </div>
          )}
        >
          <Button
            icon={<IconSvg iconName="more-horizontal" fill="#586380" />}
            size="large"
          />
        </Dropdown>
      </div>
    </ConfigProvider>
  );
};

export default OptionButtons;

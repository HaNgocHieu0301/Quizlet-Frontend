import { Button, ConfigProvider, Dropdown } from "antd";
import { useParams } from "react-router-dom";
// import Icons from "../../assets/icons";
import IconSvg from "../IconSvg";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const OptionButtons = ({
  userId,
  removeLessonCallback,
}: {
  userId: string;
  removeLessonCallback: Function;
}) => {
  const { lessonId } = useParams();
  const lessonIdNum: number = parseInt(lessonId as string);
  const [show, setShow] = useState<boolean>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShow(jwtDecode(token).sub === userId);
    }
  }, [userId]);

  const goToEdit = () => {
    window.location.href = "/Lesson/EditingMode/" + lessonIdNum;
  };
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
        {show && (
          <Button
            size="large"
            icon={<IconSvg iconName="edit" fill="#586380" />}
            onClick={goToEdit}
          />
        )}

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
                onClick={() => removeLessonCallback()}
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

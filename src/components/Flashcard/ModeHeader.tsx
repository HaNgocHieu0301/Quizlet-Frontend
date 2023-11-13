import React from "react";
import { Flex, Button, Dropdown } from "antd";
import IconSvg from "../IconSvg";

const ModeHeader = () => {
  return (
    <div className="ModeHeader bg-white sticky top-0 z-10 w-full">
      <Flex justify="space-between" align="center" className="px-6 h-16">
        <Flex justify="space-between" align="center">
          <Dropdown
            trigger={["click"]}
            placement="bottomLeft"
            dropdownRender={(menu) => (
              <div className="w-[250px] my-1 bg-white shadow-lg rounded-lg">
                <Flex vertical className="py-4">
                  <Button
                    type="text"
                    className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                    icon={
                      <IconSvg
                        width={20}
                        height={20}
                        iconName="study-learn-twilight"
                      />
                    }
                  >
                    <span>Hoc</span>
                  </Button>
                  <Button
                    type="text"
                    className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                    icon={
                      <IconSvg
                        width={20}
                        height={20}
                        iconName="study-flashcards-twilight"
                      />
                    }
                  >
                    <span>The ghi nho</span>
                  </Button>
                  <Button
                    type="text"
                    className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                    icon={
                      <IconSvg
                        width={20}
                        height={20}
                        iconName="mode-test-2022"
                      />
                    }
                  >
                    <span>Kiem tra</span>
                  </Button>
                  <Button
                    type="text"
                    className="w-full h-9 flex flex-row justify-start items-center px-4 transition duration-300 ease-in-out"
                    icon={
                      <IconSvg
                        width={20}
                        height={20}
                        iconName="mode-match-2022"
                      />
                    }
                  >
                    <span>Ghep the</span>
                  </Button>
                  <hr />
                  <Flex
                    align="center"
                    className="w-full h-9 px-4 hover:bg-black/5"
                  >
                    <a href="#id">Trang chu</a>
                  </Flex>
                  <Flex
                    align="center"
                    className="w-full h-9 px-4 hover:bg-black/5"
                  >
                    <a href="#id">Tim kiem</a>
                  </Flex>
                </Flex>
              </div>
            )}
          >
            <Button
              type="text"
              size="large"
              className="flex flex-row gap-2 items-center justify-center"
              icon={
                <IconSvg
                  width={25}
                  height={25}
                  iconName="study-learn-twilight"
                />
              }
            >
              <span className="font-semibold">Học</span>
              <IconSvg iconName="caret-down" />
            </Button>
          </Dropdown>
        </Flex>
        <Flex justify="space-between" align="center">
          <a href="#1" className="text-black font-semibold">
            Pờ tờ MLN111
          </a>
        </Flex>
        <Flex justify="space-between" align="center" gap="middle">
          <Button size="large">Tuy Chon</Button>
          <Button size="large" icon={<IconSvg iconName="close-x" />} />
        </Flex>
      </Flex>
    </div>
  );
};

export default ModeHeader;

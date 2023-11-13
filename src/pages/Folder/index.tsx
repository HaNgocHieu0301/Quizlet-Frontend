import { Flex, Button } from "antd";
import React from "react";
import IconSvg from "~/components/IconSvg";
import axios from "axios";
const index = () => {
  return (
    <>
      <div>
        <Flex>
          <Flex>
            <Flex>
              <span>2 hoc phan</span>
            </Flex>
            <Flex>
              <Button shape="circle" icon={<IconSvg iconName="plus" />} />
            </Flex>
          </Flex>
          <Flex>
            <h1>MLN122</h1>
          </Flex>
          <Flex>
            <span>Mon hoc MLN122</span>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default index;

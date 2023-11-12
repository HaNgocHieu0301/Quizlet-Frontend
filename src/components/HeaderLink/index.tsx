import style from "./style.module.css";

import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Avatar } from "antd";
import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type propsType = {
  title: String;
  icon?: boolean;
  showModal?: boolean;
};

const { TabPane } = Tabs;

function HeaderLink({ title, icon, showModal }: propsType) {
  const [tab, setTab] = useState("1");
  return (
    <span className={clsx(style.span, "font-bold")}>
      {title}{" "}
      {icon && (
        <FontAwesomeIcon className="px-2" size="sm" icon={faChevronDown} />
      )}
      {showModal && (
        <div className={clsx(style.subModal)}>
          <Tabs activeKey={tab} onChange={setTab} centered>
            <TabPane tab="Study Sets" key="1">
              <div className="max-h-60 overflow-auto">
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <Avatar
                    size="small"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faUser} />}
                  ></Avatar>
                  <span className="pl-2">Name</span>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <Avatar
                    size="small"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faUser} />}
                  ></Avatar>
                  <span className="pl-2">Name</span>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <Avatar
                    size="small"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faUser} />}
                  ></Avatar>
                  <span className="pl-2">Name</span>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <Avatar
                    size="small"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faUser} />}
                  ></Avatar>
                  <span className="pl-2">Name</span>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Folder" key="2">
              <div className="max-h-60 overflow-auto">
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <span className="text-gray-500 font-medium">
                    0 study sets
                  </span>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <span className="text-gray-500 font-medium">
                    0 study sets
                  </span>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <span className="text-gray-500 font-medium">
                    0 study sets
                  </span>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2">
                  <h1 style={{ fontSize: 16 }}>Title</h1>
                  <span className="text-gray-500 font-medium">
                    0 study sets
                  </span>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Expert solutions" key="3">
              <div className="max-h-60 overflow-auto">
                <div className="text-start hover:bg-gray-300 px-4 py-2 flex items-center justify-between">
                  <p className="truncate max-w-[200px]">
                    Title acdaasdasdasdsadsads acdaasdasdasdsadsads
                  </p>
                  <Avatar
                    shape="square"
                    size="small"
                    icon={<FontAwesomeIcon icon={faNewspaper} />}
                  ></Avatar>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2 flex items-center justify-between">
                  <p className="truncate max-w-[200px]">
                    Title acdaasdasdasdsadsads acdaasdasdasdsadsads
                  </p>
                  <Avatar
                    shape="square"
                    size="small"
                    icon={<FontAwesomeIcon icon={faNewspaper} />}
                  ></Avatar>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2 flex items-center justify-between">
                  <p className="truncate max-w-[200px]">
                    Title acdaasdasdasdsadsads acdaasdasdasdsadsads
                  </p>
                  <Avatar
                    shape="square"
                    size="small"
                    icon={<FontAwesomeIcon icon={faNewspaper} />}
                  ></Avatar>
                </div>
                <div className="text-start hover:bg-gray-300 px-4 py-2 flex items-center justify-between">
                  <p className="truncate max-w-[200px]">
                    Title acdaasdasdasdsadsads acdaasdasdasdsadsads
                  </p>
                  <Avatar
                    shape="square"
                    size="small"
                    icon={<FontAwesomeIcon icon={faNewspaper} />}
                  ></Avatar>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <div className="p-2 bg-white" style={{ borderTop: "1px solid #ccc" }}>
            <span className="hover:text-blue-600">View All</span>
          </div>
        </div>
      )}
    </span>
  );
}

export default HeaderLink;

import style from "./style.module.css";

import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Tabs, Avatar } from "antd";
import { useState, useEffect } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { checkLoginSelector } from "~/redux/selector";
import { Link } from "react-router-dom";
import axios from "axios";
import { getFlashCards } from "~/api/FlashCard";
import { Lesson } from "~/type";
import { jwtDecode } from "jwt-decode";

type propsType = {
  title: String;
  icon?: boolean;
  showModal?: boolean;
  url?: string;
};

const { TabPane } = Tabs;

function HeaderLink({ title, icon, showModal, url }: propsType) {
  const auth = useSelector(checkLoginSelector);
  const [tab, setTab] = useState("1");
  const [flashCards, setFlashcards] = useState<Lesson[]>([]);

  useEffect(() => {
    const jwt = jwtDecode(localStorage.getItem("token") || "");
    axios
      .get(getFlashCards + `?$top=5&$filter=UserId eq '${jwt.sub}'`)
      .then((res) => {
        console.log(res.data);
        setFlashcards(res.data);
      })
      .catch();
  }, []);
  return (
    <span className={clsx(style.span, "font-bold")}>
      <Link className="text-black no-underline" to={url || ""}>
        {title}{" "}
        {icon && (
          <FontAwesomeIcon className="px-2" size="sm" icon={faChevronDown} />
        )}
      </Link>

      {showModal && (
        <div className={clsx(style.subModal)}>
          <Tabs activeKey={tab} onChange={setTab} centered>
            <TabPane tab="Study Sets" key="1">
              {!auth ? (
                <h3 className="pb-4">Login to access this function</h3>
              ) : (
                <div className="max-h-60 overflow-auto">
                  {flashCards.length ? (
                    flashCards.map((flashcard, index) => (
                      <Link
                        className="text-black"
                        to={"/Lesson/" + flashcard.lessonId}
                      >
                        <div
                          key={index}
                          className="text-start hover:bg-gray-300 px-4 py-2"
                        >
                          <h1 style={{ fontSize: 16 }}>{flashcard.title}</h1>
                          <span className="text-gray-500 font-medium">
                            {flashcard.description}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h3 className="pb-4">You have not learn any study sets</h3>
                  )}
                </div>
              )}
            </TabPane>
            <TabPane tab="Folder" key="2">
              {!auth ? (
                <h3 className="pb-4">Login to access this function</h3>
              ) : (
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
              )}
            </TabPane>
            <TabPane tab="Expert solutions" key="3">
              {!auth ? (
                <h3 className="pb-4">Login to access this function</h3>
              ) : (
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
              )}
            </TabPane>
          </Tabs>
          {auth && (
            <div
              className="p-2 bg-white"
              style={{ borderTop: "1px solid #ccc" }}
            >
              <Link
                className="text-black no-underline hover:text-blue-600"
                to="/Profile"
              >
                View All
              </Link>
            </div>
          )}
        </div>
      )}
    </span>
  );
}

export default HeaderLink;

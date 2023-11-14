import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Input, Row, Select, Space, Tabs } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { debounce } from "lodash";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogApi } from "~/api/Blog";
import { getFlashCardsApi } from "~/api/FlashCard";
import { BlogType, Lesson } from "~/type";

const { TabPane } = Tabs;

function Profile() {
  const [tab, setTab] = useState("1");
  const [flashCards, setFlashcards] = useState<Lesson[]>([]);
  const [blogs, setBLogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const jwt = jwtDecode(token);
      if (tab === "1") {
        axios
          .get(getFlashCardsApi + `?$top=5&$filter=UserId eq '${jwt.sub}'`)
          .then((res) => {
            setFlashcards(res.data);
          })
          .catch();
      }
      if (tab === "2") {
      }
      if (tab === "3") {
        axios
          .get(blogApi + `?$top=5&$filter=UserId eq '${jwt.sub}'`)
          .then((res) => {
            setBLogs(res.data);
            console.log(res.data);
          })
          .catch();
      }
    }
  }, [tab]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  function handleSearch() {
    console.log("searching...");
  }

  return (
    <div className="px-40 py-12">
      <Tabs activeKey={tab} onChange={setTab}>
        <TabPane className="text-start" tab="Study Sets" key="1">
          <Space direction="horizontal">
            <Select
              defaultValue="Recent"
              style={{ width: 120 }}
              onChange={handleChange}
              size="large"
              options={[
                { value: "Recent", label: "Recent" },
                { value: "Created", label: "Created" },
              ]}
            />
            <Input
              allowClear
              size="large"
              onChange={debounce(handleSearch, 500)}
              suffix={<FontAwesomeIcon size="sm" icon={faMagnifyingGlass} />}
              placeholder="Search your sets"
            ></Input>
          </Space>

          <Row className="mt-4" gutter={24}>
            {flashCards.length ? (
              flashCards.map((flashcard, index) => (
                <Col span={8}>
                  <Card style={{ height: 100 }} hoverable bordered={false}>
                    <Link
                      className="text-black"
                      to={"/Lesson/" + flashcard.lessonId}
                    >
                      <h4 className="text-start mb-3">{flashcard.title}</h4>
                      <p className="text-start">{flashcard.description}</p>
                    </Link>
                  </Card>
                </Col>
              ))
            ) : (
              <h3 className="py-4 m-auto">
                You have not learned any study set
              </h3>
            )}
          </Row>
        </TabPane>
        <TabPane className="text-start" tab="Folder" key="2">
          <Space direction="horizontal">
            <Select
              defaultValue="Recent"
              style={{ width: 120 }}
              onChange={handleChange}
              size="large"
              options={[
                { value: "Recent", label: "Recent" },
                { value: "Created", label: "Created" },
              ]}
            />
            <Input
              allowClear
              size="large"
              onChange={debounce(handleSearch, 500)}
              suffix={<FontAwesomeIcon size="sm" icon={faMagnifyingGlass} />}
              placeholder="Search your folder"
            ></Input>
          </Space>
          <Row className="mt-4" gutter={24}>
            {flashCards.length ? (
              flashCards.map((flashcard, index) => (
                <Col span={8}>
                  <Card style={{ height: 120 }} hoverable bordered={false}>
                    <h4 className="text-start mb-3">{flashcard.title}</h4>
                    <p className="text-start">{flashcard.description}</p>
                  </Card>
                </Col>
              ))
            ) : (
              <h3 className="py-4 m-auto">You do not have any folder</h3>
            )}
          </Row>
        </TabPane>
        <TabPane className="text-start" tab="Expert solutions" key="3">
          <Space direction="horizontal">
            <Select
              defaultValue="Recent"
              style={{ width: 120 }}
              onChange={handleChange}
              size="large"
              options={[
                { value: "Recent", label: "Recent" },
                { value: "Created", label: "Created" },
              ]}
            />
            <Input
              allowClear
              size="large"
              onChange={debounce(handleSearch, 500)}
              suffix={<FontAwesomeIcon size="sm" icon={faMagnifyingGlass} />}
              placeholder="Search your blogs"
            ></Input>
          </Space>
          <Row className="mt-4" gutter={24}>
            {blogs.length ? (
              blogs.map((blog, index) => (
                <Col span={8}>
                  <Card style={{ height: 120 }} hoverable bordered={false}>
                    <Link className="text-black" to={"/Blog/" + blog.blogId}>
                      <h4 className="text-start mb-3">{blog.title}</h4>
                      <p className="text-start">
                        Creat At: {blog.createAt.toString()}
                      </p>
                    </Link>
                  </Card>
                </Col>
              ))
            ) : (
              <h3 className="py-4 m-auto">You have not read any blog</h3>
            )}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;

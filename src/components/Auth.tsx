import {
  Modal,
  Button,
  Tabs,
  Space,
  Divider,
  Form,
  Input,
  DatePicker,
  Typography,
} from "antd";
import { useState, useRef } from "react";
import login from "~/assets/images/login.png";
import google from "~/assets/images/google.png";
import facebook from "~/assets/images/facebook.png";
const { TabPane } = Tabs;

function Auth() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [tab, setTab] = useState("1");
  const topRef = useRef<HTMLDivElement>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>

      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        width={1500}
        destroyOnClose
        centered
      >
        <div className="flex h-25">
          <div
            className="w-1/2 bg-center bg-cover relative"
            style={{
              backgroundImage: `url(${login})`,
            }}
          >
            <h1 className="w-1/2 m-12 text-4xl text-[#282E3E]">
              Study effectively and also comfortably.
            </h1>
            <h1 className="absolute bottom-0 m-12 text-white text-5xl">
              Quizlet
            </h1>
          </div>
          <div
            ref={topRef}
            className="w-1/2 p-8 overflow-auto"
            style={{ height: "95vh" }}
          >
            <Tabs
              destroyInactiveTabPane
              size="large"
              activeKey={tab}
              onChange={setTab}
              centered
            >
              <TabPane tab="Register" key="1">
                <Space direction="vertical" className="w-full" size="middle">
                  <Button
                    size="large"
                    className="font-semibold flex justify-center items-center"
                    block
                    style={{ height: 52 }}
                    icon={
                      <img src={google} alt="" style={{ height: 20 }}></img>
                    }
                  >
                    Login with Google
                  </Button>

                  <Button
                    size="large"
                    className="font-semibold flex justify-center items-center"
                    block
                    style={{ height: 52 }}
                    icon={
                      <img src={facebook} alt="" style={{ height: 20 }}></img>
                    }
                  >
                    Login with Facebook
                  </Button>

                  <Divider>Or with Email</Divider>

                  <Form
                    layout="vertical"
                    autoComplete="off"
                    autoCapitalize="off"
                  >
                    <Form.Item
                      hasFeedback
                      label="Date of birth"
                      name="dob"
                      validateFirst
                      className="font-semibold"
                    >
                      <DatePicker size="large" format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="Email"
                      name="Email"
                      validateDebounce={500}
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                      ]}
                      className="font-semibold"
                    >
                      <Input placeholder="user@quizlet.com" size="large" />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="Username"
                      name="Username"
                      validateFirst
                      rules={[
                        {
                          required: true,
                          max: 20,
                        },
                      ]}
                      className="font-semibold"
                    >
                      <Input placeholder="andrew123" size="large" />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="Password"
                      name="Password"
                      validateFirst
                      rules={[
                        {
                          required: true,
                          max: 20,
                        },
                      ]}
                      className="font-semibold"
                    >
                      <Input.Password
                        placeholder="••••••••"
                        type="Password"
                        size="large"
                      />
                    </Form.Item>
                  </Form>

                  <Button size="large" block type="primary" disabled>
                    Register
                  </Button>

                  <Button size="large" block onClick={() => setTab("2")}>
                    Already have account? Login
                  </Button>
                </Space>
              </TabPane>
              <TabPane tab="Login" key="2">
                <Space direction="vertical" className="w-full" size="middle">
                  <Button
                    size="large"
                    className="font-semibold flex justify-center items-center"
                    block
                    style={{ height: 52 }}
                    icon={
                      <img src={google} alt="" style={{ height: 20 }}></img>
                    }
                  >
                    Login with Google
                  </Button>

                  <Button
                    size="large"
                    className="font-semibold flex justify-center items-center"
                    block
                    style={{ height: 52 }}
                    icon={
                      <img src={facebook} alt="" style={{ height: 20 }}></img>
                    }
                  >
                    Login with Facebook
                  </Button>

                  <Divider>Or with Email</Divider>

                  <Form
                    layout="vertical"
                    autoComplete="off"
                    autoCapitalize="off"
                  >
                    <Form.Item
                      hasFeedback
                      label="Email"
                      name="Email"
                      validateDebounce={500}
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                      ]}
                      className="font-semibold"
                    >
                      <Input placeholder="user@quizlet.com" size="large" />
                    </Form.Item>

                    <Form.Item
                      hasFeedback
                      label="Password"
                      name="Password"
                      validateFirst
                      rules={[
                        {
                          required: true,
                          max: 20,
                        },
                      ]}
                      className="font-semibold"
                    >
                      <Input.Password
                        placeholder="••••••••"
                        type="Password"
                        size="large"
                      />
                    </Form.Item>
                    <Typography.Link>Forget your password ?</Typography.Link>
                  </Form>

                  <Button size="large" block type="primary" disabled>
                    Login
                  </Button>

                  <Button size="large" block onClick={() => setTab("1")}>
                    Do not have account? Register
                  </Button>
                </Space>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Auth;

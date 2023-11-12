import { Modal, Button, Tabs, ConfigProvider, message } from "antd";
import { useState, useRef } from "react";

import loginImage from "~/assets/images/login.png";
import Register from "./Register";
import Login from "./Login";
import SubModal from "./SubModal";
import { subModalRef } from "~/type";
import Recover from "./Recover";

const { TabPane } = Tabs;

function Auth() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("1");
  const topRef = useRef<HTMLDivElement>(null);
  const subModalRef = useRef<subModalRef>(null);
  const recoverRef = useRef<subModalRef>(null);
  const [messageApi, contextHolder] = message.useMessage();

  //function
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const closeModal = (infor: JSON, action?: number) => {
    handleCancel();
    if (action === 1) {
      // Hiện from đăng nhập để điển usernam và dob
      subModalRef.current?.show(infor);
    } else if (action === 2) {
      // Hiện form quên mật khẩu
      recoverRef.current?.show();
    }
  };

  /**
   * Hiện message đăng kí thành công
   */
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Register successfully, now you can login",
      duration: 5,
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        type="text"
        size="large"
        onClick={() => {
          showModal();
          setTab("1");
        }}
      >
        Register
      </Button>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ffcd1f",
          },
        }}
      >
        <Button
          type="primary"
          className="text-black"
          size="large"
          onClick={() => {
            showModal();
            setTab("2");
          }}
        >
          Login
        </Button>
      </ConfigProvider>

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
              backgroundImage: `url(${loginImage})`,
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
                <Register
                  setTab={() => setTab("2")}
                  closeModal={closeModal}
                  success={success}
                ></Register>
              </TabPane>
              <TabPane tab="Login" key="2">
                <Login
                  setTab={() => setTab("1")}
                  closeModal={closeModal}
                ></Login>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Modal>

      <SubModal ref={subModalRef}></SubModal>
      <Recover ref={recoverRef}></Recover>
    </>
  );
}

export default Auth;

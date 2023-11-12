import { Button, Form, FormInstance, Input, Modal, Space, message } from "antd";
import axios from "axios";
import { useState, useImperativeHandle, forwardRef } from "react";
import { register } from "~/api/Auth";
import { userInfo } from "~/type";

function SubModal(props: any, ref: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subModalForm] = Form.useForm();
  const [inforUser, setInforUser] = useState(Object);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    show(infor: JSON) {
      setInforUser(infor);
      setIsModalOpen(true);
    },
  }));

  function onFinish(value: userInfo) {
    setLoading(true);
    value.email = inforUser.email;
    value.password =
      Math.floor(Math.random() * 1000) +
      "Abcd@" +
      Math.floor(Math.random() * 1000);
    value.role = "student";
    axios
      .post(register, value)
      .then((res) => {
        setLoading(false);
        setIsModalOpen(false);
        success();
      })
      .catch((error: any) => {
        if (error.response.data.message.includes("Username")) {
          subModalForm.setFields([
            {
              name: "username",
              errors: ["This username is already taken"],
            },
          ]);
        }
        setLoading(false);
      });
  }

  function isValidateInfo(form: FormInstance) {
    for (const key in form.getFieldsValue()) {
      if (!form.getFieldsValue()[key]) {
        return false;
      }
    }
    return !form.getFieldsError().filter(({ errors }) => errors.length).length;
  }

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
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        centered
      >
        <Space direction="vertical" className="w-full" size="middle">
          <Form
            layout="vertical"
            autoComplete="off"
            autoCapitalize="off"
            onFinish={onFinish}
            form={subModalForm}
            className="p-8"
          >
            <Form.Item
              hasFeedback
              label="Username"
              name="username"
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
            <Form.Item shouldUpdate className="mb-0">
              {() => (
                <Button
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!isValidateInfo(subModalForm)}
                >
                  Register
                </Button>
              )}
            </Form.Item>
          </Form>
        </Space>
      </Modal>
    </>
  );
}

export default forwardRef(SubModal);

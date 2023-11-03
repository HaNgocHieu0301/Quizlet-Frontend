import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Space,
  message,
} from "antd";
import { useState, useImperativeHandle, forwardRef } from "react";

function SubModal(props: any, ref: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subModalForm] = Form.useForm();
  const [inforUser, setInforUser] = useState(Object);
  const [messageApi, contextHolder] = message.useMessage();

  useImperativeHandle(ref, () => ({
    show(infor: JSON) {
      setInforUser(infor);
      setIsModalOpen(true);
    },
  }));

  function onFinish(value: any) {
    value.Dob = value.Dob.$d.toString();
    value.email = inforUser.email;
    value.name = inforUser.name;
    value.picture = inforUser.picture.data
      ? inforUser.picture.data.url
      : inforUser.picture;
    console.log(value);
    setIsModalOpen(false);
    success();
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
              label="Date of birth"
              name="Dob"
              validateFirst
              className="font-semibold"
            >
              <DatePicker size="large" format="DD/MM/YYYY" />
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
            <Form.Item shouldUpdate className="mb-0">
              {() => (
                <Button
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
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

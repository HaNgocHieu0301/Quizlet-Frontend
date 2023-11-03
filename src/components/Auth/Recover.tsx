import { message, Button, Form, FormInstance, Input, Modal } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";

function Recover(props: any, ref: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recoverForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useImperativeHandle(ref, () => ({
    show() {
      setIsModalOpen(true);
    },
  }));

  const success = () => {
    messageApi.open({
      type: "success",
      content: "We've sent an email, please check it to change your password",
      duration: 5,
    });
  };

  function onFinish(value: JSON) {
    console.log(value);
    success();
    setIsModalOpen(false);
  }

  function isValidateInfo(form: FormInstance) {
    for (const key in form.getFieldsValue()) {
      if (!form.getFieldsValue()[key]) {
        return false;
      }
    }
    return !form.getFieldsError().filter(({ errors }) => errors.length).length;
  }

  return (
    <>
      {contextHolder}
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          recoverForm.resetFields();
        }}
        destroyOnClose
        centered
      >
        <div className="p-8">
          <h1 className="mb-4">Reset your password</h1>
          <p className="mb-4">
            Enter your Quizlet username or the email address you signed up with.
            We'll email you a link to log in and reset your password. If you
            signed up with your parent’s email, we’ll send them a link.
          </p>
          <Form
            layout="vertical"
            autoComplete="off"
            autoCapitalize="off"
            onFinish={onFinish}
            form={recoverForm}
          >
            <Form.Item
              hasFeedback
              label="Email"
              name="Email"
              validateFirst
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              className="font-semibold"
            >
              <Input placeholder="Username or email address" size="large" />
            </Form.Item>
            <Form.Item shouldUpdate className="mt-2 mb-0">
              {() => (
                <Button
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={!isValidateInfo(recoverForm)}
                >
                  Submit
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default forwardRef(Recover);

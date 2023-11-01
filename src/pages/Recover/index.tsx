import { Button, Form, FormInstance, Input } from "antd";
import changePassword from "~/assets/images/changePassword.png";

function Recover() {
  const [recoverForm] = Form.useForm();

  function onFinish(value: JSON) {
    console.log(value);
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
    <div>
      <div
        className="bg-center bg-cover m-auto py-44 px-96 text-start"
        style={{
          backgroundImage: `url(${changePassword})`,
        }}
      >
        <h1 className="mb-4">Change your password</h1>
        <Form
          layout="vertical"
          autoComplete="off"
          autoCapitalize="off"
          onFinish={onFinish}
          form={recoverForm}
        >
          <Form.Item
            hasFeedback
            label="Password"
            name="Password"
            validateFirst
            rules={[
              {
                required: true,
                min: 6,
                max: 20,
              },
            ]}
            className="font-semibold"
          >
            <Input.Password placeholder="Enter your password" size="large" />
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
    </div>
  );
}

export default Recover;

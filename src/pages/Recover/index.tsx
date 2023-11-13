import { Button, Form, FormInstance, Input } from "antd";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { changePasswordApi } from "~/api/Auth";
import changePassword from "~/assets/images/changePassword.png";
import { useState } from "react";

function Recover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [recoverForm] = Form.useForm();

  function onFinish(value: any) {
    setLoading(true);
    const data = {
      email: searchParams.get("email"),
      token: searchParams.get("token"),
      newPassword: value.Password,
    };
    const json = JSON.stringify(data);
    axios
      .post(changePasswordApi, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setLoading(false);
        navigate("/");
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
                pattern: new RegExp(
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                ),
                message:
                  "Contain at least 1 uppercase letter, 1 number, and 1 special character",
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
                loading={loading}
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

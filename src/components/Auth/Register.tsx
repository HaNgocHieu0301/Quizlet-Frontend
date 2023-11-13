import { Button, Divider, Space, Form, Input, FormInstance } from "antd";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useLogin } from "react-facebook";

import google from "~/assets/images/google.png";
import facebook from "~/assets/images/facebook.png";
import { register, loginGoogleApi, loginFacebookApi } from "~/api/Auth";
import { userInfo } from "~/type";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AuthSlice from "./AuthSlice";

type Props = {
  setTab: Function;
  closeModal: Function;
  success: Function;
};

function Register({ setTab, closeModal, success }: Props) {
  const { login, isLoading } = useLogin();
  const [loading, setLoading] = useState(false);
  const [registerForm] = Form.useForm();
  const dispatch = useDispatch();

  /**
   * Gửi form đi
   * @param value dữ liệu đầu vào
   */
  function onFinish(value: userInfo) {
    setLoading(true);
    value.role = "student";
    axios
      .post(register, value)
      .then((res) => {
        setLoading(false);
        registerForm.resetFields();
        closeModal(null, 3);
        success();
      })
      .catch((error: any) => {
        if (error.response.data.message.includes("email")) {
          registerForm.setFields([
            {
              name: "email",
              errors: ["This email is already registered"],
            },
          ]);
        }
        if (error.response.data.message.includes("Username")) {
          registerForm.setFields([
            {
              name: "username",
              errors: ["This username is already taken"],
            },
          ]);
        }
        setLoading(false);
      });
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get(loginGoogleApi + codeResponse.access_token);
        if (res.data.result.token) {
          closeModal(res.data, 3);
          dispatch(AuthSlice.actions.login());
          localStorage.setItem("token", res.data.result.token);
        } else {
          closeModal(res.data.result.user, 1);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function loginFacebook() {
    try {
      const response = (await login({ scope: "email", rerequest: false }))
        .authResponse.accessToken;
      const res = await axios.get(loginFacebookApi + response);
      if (res.data.result.token) {
        closeModal(res.data, 3);
        dispatch(AuthSlice.actions.login());
        localStorage.setItem("token", res.data.result.token);
      } else {
        closeModal(res.data.result.user, 1);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  /**
   * Kiểm tra điểu kiện của form
   * @param form
   * @returns
   */
  function isValidateInfo(form: FormInstance) {
    for (const key in form.getFieldsValue()) {
      if (!form.getFieldsValue()[key]) {
        return false;
      }
    }
    return !form.getFieldsError().filter(({ errors }) => errors.length).length;
  }

  return (
    <Space direction="vertical" className="w-full" size="middle">
      <Button
        size="large"
        className="font-semibold flex justify-center items-center"
        block
        onClick={() => loginGoogle()}
        style={{ height: 52 }}
        icon={<img src={google} alt="" style={{ height: 20 }}></img>}
      >
        Login with Google
      </Button>

      <Button
        size="large"
        className="font-semibold flex justify-center items-center"
        block
        style={{ height: 52 }}
        onClick={loginFacebook}
        disabled={isLoading}
        icon={<img src={facebook} alt="" style={{ height: 20 }}></img>}
      >
        Login with Facebook
      </Button>

      <Divider>Or with Email</Divider>

      <Form
        layout="vertical"
        autoComplete="off"
        autoCapitalize="off"
        onFinish={onFinish}
        form={registerForm}
      >
        <Form.Item
          hasFeedback
          label="Email"
          name="email"
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
          <Input placeholder="user@quizlet.com" size="large" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Username"
          name="username"
          validateFirst
          rules={[
            {
              required: true,
              max: 20,
              min: 6,
            },
          ]}
          className="font-semibold"
        >
          <Input placeholder="andrew123" size="large" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Password"
          name="password"
          validateFirst
          rules={[
            {
              required: true,
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
          <Input.Password placeholder="••••••••" type="Password" size="large" />
        </Form.Item>
        <Form.Item shouldUpdate className="mb-0">
          {() => (
            <Button
              loading={loading}
              size="large"
              block
              type="primary"
              htmlType="submit"
              disabled={!isValidateInfo(registerForm)}
            >
              Register
            </Button>
          )}
        </Form.Item>
      </Form>

      <Button size="large" block onClick={() => setTab("2")}>
        Already have account? Login
      </Button>
    </Space>
  );
}

export default Register;

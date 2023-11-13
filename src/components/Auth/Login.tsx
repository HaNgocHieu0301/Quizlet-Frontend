import {
  Button,
  Divider,
  Space,
  Form,
  Input,
  FormInstance,
  Typography,
} from "antd";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useLogin } from "react-facebook";
import { useDispatch } from "react-redux";

import AuthSlice from "./AuthSlice";
import google from "~/assets/images/google.png";
import facebook from "~/assets/images/facebook.png";
import { loginFacebookApi, loginGoogleApi, loginApi } from "~/api/Auth";
import { useState } from "react";

type Props = {
  setTab: Function;
  closeModal: Function;
};

function Login({ setTab, closeModal }: Props) {
  const { login, isLoading } = useLogin();
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function onFinish(value: JSON) {
    setLoading(true);
    axios
      .post(loginApi, value)
      .then((res) => {
        setLoading(false);
        closeModal();
        loginForm.resetFields();
        localStorage.setItem("token", res.data.result.token);
        dispatch(AuthSlice.actions.login());
      })
      .catch((error: any) => {
        console.log(error);
        loginForm.setFields([
          {
            name: "password",
            errors: ["Username or password is incorrect!"],
          },
        ]);
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
        form={loginForm}
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
          label="Password"
          name="password"
          validateFirst
          rules={[
            {
              required: true,
              max: 20,
              min: 8,
            },
          ]}
          className="font-semibold"
        >
          <Input.Password
            placeholder="••••••••"
            type="Password"
            size="large"
            autoComplete="nope"
          />
        </Form.Item>
        <Typography.Link onClick={() => closeModal(null, 2)}>
          Forget your password ?
        </Typography.Link>

        <Form.Item shouldUpdate className="mt-2 mb-0">
          {() => (
            <Button
              size="large"
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!isValidateInfo(loginForm)}
            >
              Login
            </Button>
          )}
        </Form.Item>
      </Form>
      <Button size="large" block onClick={() => setTab("1")}>
        Do not have account? Register
      </Button>
    </Space>
  );
}

export default Login;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import styles from "./LoginPage.module.css";
import {
  Card,
  Button,
  Alert,
  Divider,
  Typography,
  Flex,
  Form,
  Checkbox,
  Input,
  message,
} from "antd";
import { Link as RouterLink } from "react-router-dom";
import type { FormProps } from "antd";
import { GoogleOutlined, LoginOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../utils/authenticated";

const { Title, Text, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) navigate('/')
  })

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await axiosInstance.post("auth/jwt/create", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.rerfresh);
      axiosInstance.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem('access_token')
      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status != 200)
          setErrorMessage("Invalid Username or Password")
      } else if (error.request) {
        message.error("No response from server.")
      } else {
        message.error("An unexpected error occured.")
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (values) => {
    console.log("Failed", values);
  };
  return (
    <div className={styles.container}>
      <Card bordered={true} className={styles.card}>
        <Title level={3}>Login</Title>
        <Text className={styles.welcomeText}>Hi, Welcome Back👋</Text>
        <Button
          type="default"
          icon={<GoogleOutlined />}
          iconPosition="start"
          className={styles.google}
        >
          Sign In with Google
        </Button>
        <Divider>
          <Text className={styles.helperText}>or sign in with email</Text>
        </Divider>
        {errorMessage && (
          <Alert
            message="Invalid Username or Password"
            type="error"
            showIcon
            closable
            style={{ marginBottom: "2rem" }}
            onClose={() => setErrorMessage(null)}
          />
        )}
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email: "
            name="email"
            rules={[
              { message: "Enter a valid email", type: "email" },
              { message: "Please input your email!", required: true },
            ]}
          >
            <Input variant="filled" placeholder="your@email.com" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password: "
            name="password"
            rules={[{ message: "Please input your password!", required: true }]}
          >
            <Input.Password
              variant="filled"
              placeholder="Enter your password"
            />
          </Form.Item>
          <Flex align="flex-start" justify="space-between">
            <Checkbox>Remember Me</Checkbox>
            <Link href="/">Forgot your password?</Link>
          </Flex>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button
              type="primary"
              className={styles.submit}
              htmlType="submit"
              icon={<LoginOutlined />}
              iconPosition="end"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
        <Divider orientation="left">
          <Text>
            Dont have an account?{" "}
            <Link>
              <RouterLink to="/register">Create one</RouterLink>
            </Link>
          </Text>
        </Divider>
      </Card>
    </div>
  );
};

export default LoginPage;

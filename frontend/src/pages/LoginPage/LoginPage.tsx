import React from "react";
import styles from "./LoginPage.module.css";
import {
  Card,
  Button,
  Divider,
  Typography,
  Flex,
  Form,
  Checkbox,
  Input,
} from "antd";
import { Link as RouterLink } from "react-router-dom";
import type { FormProps } from "antd";
import { GoogleOutlined, LoginOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (values) => {
  console.log("Success", values);
};

const LoginPage: React.FC = () => {
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
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email: "
            name="email"
            rules={[{ message: "Please input your email!", type: "email" }]}
          >
            <Input variant="filled" placeholder="your@email.com" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password: "
            name="password"
            rules={[{ message: "Please input your password!" }]}
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

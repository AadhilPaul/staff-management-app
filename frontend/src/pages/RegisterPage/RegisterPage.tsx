import React from "react";
import styles from "./RegsiterPage.module.css";
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
import image1 from "../../assets/1.png";
import { UserAddOutlined, } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (values) => {
  console.log("Success", values);
};

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card
        className={styles.card}
        styles={{ body: { padding: 0, overflow: "hidden" } }}
      >
        <Flex justify="space-between">
          <img alt="avatar" src={image1} className={styles.imgStyle} />
          <Flex vertical style={{ padding: 32, width: "50%" }}>
            <Title level={3}>Register Yout Account</Title>
            <Text className={styles.welcomeText}>
              Let's get you set up and ready to go🚀
            </Text>
            <Divider />
            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username: "
                required
                name="username"
                rules={[
                  { message: "Please input your username!", type: "string" },
                ]}
              >
                <Input variant="filled" placeholder="chubbycheeks609 etc..." />
              </Form.Item>
              <Form.Item<FieldType>
                label="Email: "
                required
                name="email"
                rules={[{ message: "Please input your email!", type: "email" }]}
              >
                <Input variant="filled" placeholder="your@email.com" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password: "
                name="password"
                required
                rules={[{ message: "Please input your password!" }]}
              >
                <Input.Password
                  variant="filled"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item<FieldType>
                label="Confirm Password: "
                name="password"
                required
                rules={[{ message: "Please input your password!" }]}
              >
                <Input.Password
                  variant="filled"
                  placeholder="Confirm your password"
                />
              </Form.Item>
              <Checkbox>
                I agree to the <Link href="/"> Terms of Service</Link> and{" "}
                <Link href="/">Privacy Policy</Link>
              </Checkbox>

              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button
                  type="primary"
                  className={styles.submit}
                  htmlType="submit"
                  icon={<UserAddOutlined />}
                  iconPosition="end"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
            <Divider orientation="left">
              <Text color="secondary">
                Already have an account?{" "}
                <Link>
                  {" "}
                  <RouterLink to="/login">Login Here</RouterLink>
                </Link>
              </Text>
            </Divider>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default RegisterPage;

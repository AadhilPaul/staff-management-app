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
import image1 from "../../assets/register_cover.png";
import { UserAddOutlined } from "@ant-design/icons";
import {loadForbiddenPasswords, calculateSimilarity} from "../../utils/validation";
import { RuleObject } from "antd/es/form";

const { Title, Text, Link } = Typography;

interface FormValues {
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm<FormValues>();

  const usernameValidationRegex = /^[\w.@+-]+$/;
  const passwordValidationRegex = /^(?=.*\d).+$/;

  const validatePassword = async (_: RuleObject, value: string) => {
    const forbiddenPasswords = await loadForbiddenPasswords();

    if (forbiddenPasswords.includes(value.toLowerCase())) {
      return Promise.reject(new Error("Password is too common"));
    }

    return Promise.resolve();
  };

  // Function to check if the password is too similar to any user attributes
  const calculateFieldSimilarity = (_: RuleObject, value: string) => {
    const username = form.getFieldValue("username") || "";
    const email = form.getFieldValue("email") || "";

    const usernameSimilarityRatio = calculateSimilarity(username, value);
    const emailSimilarityRatio = calculateSimilarity(email, value);

    // Determine dynamic thresholds based on attribute lengths
    const similarityThresholdRatio = 0.7;

    // Check if similarity ratios exceed their respective thresholds
    if (usernameSimilarityRatio >= similarityThresholdRatio) {
      return Promise.reject(
        new Error("Your password is too similar to your username")
      );
    } else if (emailSimilarityRatio >= similarityThresholdRatio) {
      return Promise.reject(
        new Error("Your password is too similar to your email address")
      );
    }

    return Promise.resolve();
  };

  const confirmPasswordValidator = (_: RuleObject, value: string) => {
    const password = form.getFieldValue("password");

    if (value && value !== password) {
      return Promise.reject(new Error("Passwords do not match"));
    }
    return Promise.resolve();
  };

  const onFinish = (values: FormValues) => {
    console.log("Success", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed", errorInfo);
  };

  return (
    <div className={styles.container}>
      <Card
        className={styles.card}
        styles={{ body: { padding: 0, overflow: "hidden" } }}
      >
        <Flex justify="space-between">
          <img alt="avatar" src={image1} className={styles.imgStyle} />
          <Flex vertical className={styles.form}>
            <Title level={3}>Register Yout Account</Title>
            <Text className={styles.welcomeText}>
              Let's get you set up and ready to go🚀
            </Text>
            <Divider />
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username: "
                required
                name="username"
                rules={[
                  { message: "Please input your username!", required: true },
                  {
                    min: 1,
                    message: "Username should be at least one character long",
                  },
                  {
                    max: 150,
                    message: "Username should not exceed 150 characters",
                  },
                  {
                    pattern: usernameValidationRegex,
                    message: "Enter a valid username",
                  },
                ]}
              >
                <Input variant="filled" placeholder="chubbycheeks609 etc..." />
              </Form.Item>
              <Form.Item
                label="Email: "
                required
                name="email"
                rules={[
                  { message: "Enter a valid email", type: "email" },
                  { message: "Please input ur email!", required: true },
                ]}
              >
                <Input variant="filled" placeholder="your@email.com" />
              </Form.Item>

              <Form.Item
                label="Password: "
                name="password"
                required
                rules={[
                  { message: "Please input your password!", required: true },
                  {
                    min: 8,
                    message: "Password should be at least 8 characters long",
                  },
                  {
                    pattern: passwordValidationRegex,
                    message:
                      "Password should have at least one numeric character",
                  },
                  { validator: validatePassword },
                  { validator: calculateFieldSimilarity },
                ]}
              >
                <Input.Password
                  variant="filled"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password: "
                name="confrm_password"
                required
                rules={[
                  { message: "Please confirm your password!", required: true },
                  { validator: confirmPasswordValidator },
                ]}
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

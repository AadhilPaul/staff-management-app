import React from "react";
import styles from "./RegsiterPage.module.css";
import {
  Card,
  Button,
  Divider,
  Alert,
  Typography,
  Flex,
  Form,
  Checkbox,
  Input,
  message,
} from "antd";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import image1 from "../../assets/images/register_cover.png";
import { UserAddOutlined } from "@ant-design/icons";
import {
  loadForbiddenPasswords,
  calculateSimilarity,
} from "../../utils/validation";
import { RuleObject } from "antd/es/form";

const { Title, Text, Link } = Typography;

interface FormValues {
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<FormValues>();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [alertType, setAlertType] = React.useState<"username" | "email" | null>(
    null
  );

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

  const onFinish = async (values: FormValues) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/users/", {
        username: values.username,
        email: values.email,
        password: values.password,
        re_password: values.confirm_password,
      });
      console.log("Response Data: ", response.data);
      setErrorMessage(null); // Reset error if successful
      navigate('/login')
    } catch (error: any) {
      if (error.response) {
        // Assuming the backend provides specific error messages for username or email already existing
        const errorData = error.response.data;

        if (errorData.username) {
          setAlertType("username");
          setErrorMessage(
            "The username you entered is already in use. Please choose a different username."
          );
        } else if (errorData.email) {
          setAlertType("email");
          setErrorMessage(
            "The email address you entered is already associated with another account. Please try logging in or use a different email."
          );
        } else {
          setErrorMessage("An unknown error occurred. Please try again.");
        }
      } else if (error.request) {
        message.error("No response from the server.");
      } else {
        message.error("An unexpected error occurred.");
      }
    }
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
            {errorMessage && (
              <Alert
                message={
                  alertType === "username"
                    ? "Username Already Taken"
                    : "Email Address Already Registered"
                }
                description={errorMessage}
                type="error"
                showIcon
              />
            )}
            <Title level={3}>Register Your Account</Title>
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
                  { message: "Please input your email!", required: true },
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
                name="confirm_password"
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

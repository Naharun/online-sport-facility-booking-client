import React from "react";
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Card,
  Row,
  Col,
  Space,
} from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { loginUser } from "../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Social icons

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const resultAction = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(resultAction)) {
        const { data } = resultAction.payload || {};
        if (data?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }

        message.success("Login successful!");
      } else {
        message.error("Invalid credentials!");
      }
    } catch (error) {
      message.error("An error occurred during login.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #fff 0%, #F0E68C 100%)", // Sporty gradient background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundAttachment: "fixed", // Keeps background fixed while scrolling
        overflow: "hidden",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent white for form contrast
          animation: "fadeIn 1.5s ease-in-out", // Animation for form fade-in
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "700",
            marginBottom: "20px",
            fontSize: "32px",
            letterSpacing: "1px",
            textTransform: "uppercase", // Uppercase for sports vibe
          }}
        >
          Welcome Back, Athlete!
        </Title>

        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              style={{
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "20px",
                fontSize: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease", // Smooth transition
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px rgba(33, 150, 243, 0.7)")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              style={{
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "20px",
                fontSize: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease", // Smooth transition
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 10px rgba(33, 150, 243, 0.7)")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              borderRadius: "8px",
              padding: "12px",
              fontSize: "18px",
              backgroundColor: "#CD5C5C",
              borderColor: "#CD5C5C",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 8px rgba(33, 150, 243, 0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#CD5C5C"; // Darker shade on hover
              e.currentTarget.style.boxShadow =
                "0 8px 12px rgba(33, 150, 243, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#CD5C5C"; // Reset to original color
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(33, 150, 243, 0.5)";
            }}
          >
            Login
          </Button>
        </Form>

        <Row justify="center" style={{ marginTop: "30px" }}>
          <Col>
            <Space size="large">
              {/* Social Media Links */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={28} color="#3b5998" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={28} color="#E1306C" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={28} color="#1DA1F2" />
              </a>
            </Space>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <p style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
              New to our platform? <a href="/register">Sign up</a>
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;

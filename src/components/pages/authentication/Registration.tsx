import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Space,
  Typography,
  Card,
  Modal,
  Alert,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { registerUser } from "../../../redux/auth/authSlice";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Social icons

const { Title } = Typography;
const { Option } = Select;

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onFinish = (values: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
  }) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setIsModalVisible(true);
    } else if (user) {
      setModalMessage("Registration successful! Welcome!");
      setIsModalVisible(true);
    }
  }, [error, user]);

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      style={{
        height: "100%",
        background: "linear-gradient(135deg, #fff 0%, #F0E68C 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundAttachment: "fixed",
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
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          animation: "fadeIn 1.5s ease-in-out",
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
            textTransform: "uppercase",
          }}
        >
          Register as a New Athlete!
        </Title>

        {!user ? (
          <Form onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "20px",
                }}
              >
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
            {error && <Alert message={error} type="error" />}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
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
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div>
            <h2>Welcome, {user.name}!</h2>
          </div>
        )}
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

        <Modal
          title="Registration Status"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalOk}
        >
          <p>{modalMessage}</p>
        </Modal>
      </Card>
    </div>
  );
};

export default Registration;

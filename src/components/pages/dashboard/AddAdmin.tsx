import React from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { registerUser } from "../../../redux/auth/authSlice";

const { Title } = Typography;

const AddAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    try {
      const resultAction = await dispatch(registerUser(values));

      if (registerUser.fulfilled.match(resultAction)) {
        message.success("Admin registered successfully!");
      } else {
        message.error("Failed to register admin.");
      }
    } catch (error) {
      message.error("An error occurred.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4}>Add Admin</Title>
      <Card>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            initialValue="admin"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Admin
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddAdmin;

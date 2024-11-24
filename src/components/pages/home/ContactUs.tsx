import { Form, Input, Button, Row, Col, Typography, Card } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    // Handle submission of form data (e.g., send to API)
  };

  return (
    <div style={{ padding: "50px 20px", maxWidth: "900px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", color: "#4A90E2" }}>
        Contact Us
      </Title>
      <Paragraph style={{ textAlign: "center", marginBottom: "40px" }}>
        We’re here to help! Reach out with any questions, support needs, or
        feedback.
      </Paragraph>

      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{ background: "#f4f6f8", borderRadius: "8px" }}
          >
            <Title level={4}>Contact Details</Title>
            <Paragraph>
              <MailOutlined /> Email: support@yourplatform.com
            </Paragraph>
            <Paragraph>
              <PhoneOutlined /> Phone: +880 (123) 456-7890
            </Paragraph>
            <Paragraph>
              <EnvironmentOutlined /> Address: Dhaka, Bangladesh
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{ background: "#f4f6f8", borderRadius: "8px" }}
          >
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29206.652909925576!2d90.3799959!3d23.7807775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7bd7d43c8c5%3A0xa3e6fcb4f44dbd38!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1617634325668!5m2!1sen!2sbd"
              width="100%"
              height="200"
              style={{ border: "none", borderRadius: "8px" }}
              loading="lazy"
            ></iframe>
          </Card>
        </Col>
      </Row>

      <Form
        name="contact_form"
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: "40px" }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Your Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Your Email" />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: "Please enter a subject" }]}
        >
          <Input placeholder="Subject" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <TextArea rows={4} placeholder="Your Message" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              backgroundColor: "#4A90E2",
              border: "none",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactUs;

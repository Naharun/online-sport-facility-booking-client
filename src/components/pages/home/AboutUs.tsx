import { Row, Col, Card, Typography, Divider, Timeline } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <div style={{ padding: "50px 20px", maxWidth: "1000px", margin: "auto" }}>
      {/* Mission Statement */}
      <Title level={2} style={{ textAlign: "center", color: "#4A90E2" }}>
        About Us
      </Title>
      <Paragraph
        style={{ textAlign: "center", fontSize: "1.2em", margin: "20px 0" }}
      >
        Our mission is to create a seamless booking experience, making
        facilities accessible and convenient for all users.
      </Paragraph>

      {/* Team Section */}
      <Divider orientation="left">Our Team</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img alt="Team Member 1" src="https://via.placeholder.com/150" />
            }
          >
            <Card.Meta title="John Doe" description="CEO" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img alt="Team Member 2" src="https://via.placeholder.com/150" />
            }
          >
            <Card.Meta title="Jane Smith" description="CTO" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img alt="Team Member 3" src="https://via.placeholder.com/150" />
            }
          >
            <Card.Meta title="Alex Johnson" description="Head of Marketing" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            hoverable
            cover={
              <img alt="Team Member 4" src="https://via.placeholder.com/150" />
            }
          >
            <Card.Meta title="Emily Brown" description="Lead Developer" />
          </Card>
        </Col>
      </Row>

      {/* History & Milestones */}
      <Divider orientation="left" style={{ marginTop: "40px" }}>
        Our Journey
      </Divider>
      <Timeline>
        <Timeline.Item color="green">
          <Title level={4}>2020</Title>
          <Paragraph>
            Company founded with a vision to simplify facility bookings.
          </Paragraph>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <Title level={4}>2021</Title>
          <Paragraph>
            Reached 10,000 users and expanded into new regions.
          </Paragraph>
        </Timeline.Item>
        <Timeline.Item color="red">
          <Title level={4}>2022</Title>
          <Paragraph>
            Launched mobile app to enhance accessibility for users on the go.
          </Paragraph>
        </Timeline.Item>
        <Timeline.Item>
          <Title level={4}>2024</Title>
          <Paragraph>
            Partnered with major facilities to bring exclusive booking options
            to our users.
          </Paragraph>
        </Timeline.Item>
      </Timeline>

      {/* Contact Information */}
      <Divider orientation="left" style={{ marginTop: "40px" }}>
        Contact Information
      </Divider>
      <Card
        bordered={false}
        style={{ background: "#f4f6f8", borderRadius: "8px" }}
      >
        <Paragraph>
          <EnvironmentOutlined /> Office Address: Dhaka, Bangladesh
        </Paragraph>
        <Paragraph>
          <PhoneOutlined /> Phone: +880 (123) 456-7890
        </Paragraph>
        <Paragraph>
          <MailOutlined /> Email: contact@yourplatform.com
        </Paragraph>
      </Card>
    </div>
  );
};

export default AboutUs;

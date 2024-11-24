import { Typography, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

const CompanyInfo = () => {
  return (
    <div style={{ padding: "50px 20px", maxWidth: "900px", margin: "auto" }}>
      <Title level={2} style={{ color: "#4A4A4A", textAlign: "center" }}>
        More About Us
      </Title>
      <Paragraph
        style={{
          fontSize: "16px",
          lineHeight: "1.8",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Welcome to [Your Platform Name], where convenience, reliability, and
        excellent facilities come together to enhance your experience. Here, you
        can explore, book, and enjoy spaces that meet your needs for any event,
        sports, or personal project. Let us walk you through why we’re your best
        choice.
      </Paragraph>

      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ background: "#f4f6f8", borderRadius: "8px" }}
          >
            <Title level={4} style={{ color: "#4A90E2" }}>
              Why Choose Us?
            </Title>
            <Paragraph style={{ lineHeight: "1.6" }}>
              We prioritize a smooth, user-friendly experience with access to
              top-rated facilities, transparent pricing, and secure bookings.
              Whether for sports, work, or celebrations, our spaces are chosen
              to meet diverse needs and high standards.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ background: "#f4f6f8", borderRadius: "8px" }}
          >
            <Title level={4} style={{ color: "#4A90E2" }}>
              How It Works
            </Title>
            <Paragraph style={{ lineHeight: "1.6" }}>
              Booking with us is simple: Browse facilities, check availability,
              and secure your booking instantly. Our easy-to-follow steps ensure
              you can plan your event in just a few clicks, giving you more time
              to focus on what matters.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            bordered={false}
            style={{ background: "#f4f6f8", borderRadius: "8px" }}
          >
            <Title level={4} style={{ color: "#4A90E2" }}>
              Customer Support
            </Title>
            <Paragraph style={{ lineHeight: "1.6" }}>
              We’re here to help. Our dedicated support team is ready to assist
              with any questions or concerns, ensuring you feel confident and
              supported every step of the way.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: "40px", textAlign: "center" }}>
        <Col span={24}>
          <Title level={4} style={{ color: "#4A4A4A", marginBottom: "20px" }}>
            Join Our Community
          </Title>
          <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
            Become part of a community that values quality, convenience, and
            memorable experiences. Our goal is to connect you with the perfect
            space to suit your needs. Ready to start planning? Click below to
            explore our facilities or create your first booking today!
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyInfo;

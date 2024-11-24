import { Typography, Row, Col } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const steps = [
  {
    title: "1. Select a Facility",
    description:
      "Choose a facility you want to book from the available options.",
    icon: "🏢", // Replace with an icon or image as needed
  },
  {
    title: "2. Choose Date and Time",
    description: "Select the desired date, start time, and end time.",
    icon: <ClockCircleOutlined />,
  },
  {
    title: "3. Confirm Availability",
    description:
      "The platform checks the facility's availability for the selected slot.",
    icon: "✅", // Replace with an icon or image as needed
  },
  {
    title: "4. Review and Confirm",
    description: "Review booking details and confirm to finalize your booking.",
    icon: <CheckCircleOutlined />,
  },
  {
    title: "5. Receive Confirmation",
    description:
      "You’ll receive a booking confirmation with details and payment.",
    icon: "📩", // Replace with an icon or image as needed
  },
];

const HowItWorks = () => {
  return (
    <div style={{ padding: "50px 20px", backgroundColor: "#f9fafb" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        How It Works
      </Title>
      <Row gutter={[32, 32]} justify="center">
        {steps.map((step, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={8}
            lg={4}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "36px", marginBottom: "10px" }}>
              {step.icon}
            </div>
            <Title level={4}>{step.title}</Title>
            <Text>{step.description}</Text>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HowItWorks;

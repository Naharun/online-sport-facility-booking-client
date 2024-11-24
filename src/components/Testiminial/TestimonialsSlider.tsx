import React from "react";
import { Carousel, Card, Rate, Typography } from "antd";
import { testimonials } from "../../data/testimonials.ts"; // Import testimonial data

const { Meta } = Card;
const { Text } = Typography;

const TestimonialsSlider: React.FC = () => {
  return (
    <div
      style={{
        padding: "50px 20px",
        backgroundColor: "#f9fafb",
        textAlign: "center",
      }}
    >
      <h2>Customer Testimonials</h2>
      <Carousel autoplay>
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Meta
              avatar={
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{ borderRadius: "50%" }}
                />
              }
              title={testimonial.name}
              description={
                <>
                  <Text>"{testimonial.feedback}"</Text>
                  <div style={{ marginTop: "10px" }}>
                    <Rate disabled defaultValue={testimonial.rating} />
                  </div>
                </>
              }
            />
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialsSlider;

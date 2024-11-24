import React from "react";
import { useGetFacilitiesQuery } from "../../../redux/api/api";
import { Row, Col, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import FacilityCard from "./FacilityCard";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const FeaturedFacilities: React.FC = () => {
  const { data, isLoading, error } = useGetFacilitiesQuery({});
  const facilities = data?.data?.slice(0, 4); // Display only the first 8 facilities
  const navigate = useNavigate();

  if (isLoading) return <p>Loading featured facilities...</p>;
  if (error) return <p>Error loading facilities.</p>;

  return (
    <div style={{ marginTop: 80 }}>
      <Title style={{ textAlign: "center" }} level={2}>
        Featured Facilities
      </Title>
      <p style={{ textAlign: "center", fontSize: 20 }}>
        Find sports facilities from football pitches to tennis courts in a range
        of cities across the Bangladesh and Ireland
      </p>
      <Row gutter={[16, 16]}>
        {Array.isArray(facilities) && facilities.length > 0 ? (
          facilities.map((facility) => (
            <Col key={facility._id} xs={24} sm={12} md={8} lg={6}>
              <FacilityCard facility={facility} />
            </Col>
          ))
        ) : (
          <p>No facilities available at this time.</p>
        )}
      </Row>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Button
          style={{ backgroundColor: "black", color: "white", padding: 20 }}
          onClick={() => navigate("/all-facilities")}
        >
          View More <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedFacilities;

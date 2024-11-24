import React from "react";
import { useGetFacilitiesQuery } from "../../../redux/api/api";
import { Row, Col, Typography } from "antd";
import FacilityCard from "./FacilityCard";

const { Title } = Typography;

const AllFacilities: React.FC = () => {
  const { data, isLoading, error } = useGetFacilitiesQuery({});
  const facilities = data?.data;

  if (isLoading) return <p>Loading all facilities...</p>;
  if (error) return <p>Error loading facilities.</p>;

  return (
    <div>
      <Title level={2}>All Facilities</Title>
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
    </div>
  );
};

export default AllFacilities;

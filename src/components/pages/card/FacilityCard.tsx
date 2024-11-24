import React, { useState } from "react";
import { Card, Button } from "antd";
import { Facility } from "../../type/types";

interface FacilityCardProps {
  facility: Facility;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const [showMore, setShowMore] = useState(false);

  // Toggle showMore state
  const handleShowMore = () => setShowMore(!showMore);

  return (
    <Card hoverable cover={<img alt={facility.image} src={facility.image} />}>
      <Card.Meta title={facility.name} description={facility.description} />
      <p>Price per hour: ${facility.pricePerHour}</p>
      <p>Location: {facility.location}</p>

      {/* Conditionally render more data */}
      {showMore && (
        <div>
          <p>Additional Info 1: {/* add your data here */}</p>
          <p>Additional Info 2: {/* add your data here */}</p>
        </div>
      )}

      {/* Show More/Less button */}
      <Button type="link" onClick={handleShowMore}>
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </Card>
  );
};

export default FacilityCard;

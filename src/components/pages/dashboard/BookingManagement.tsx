import React from "react";
import { List, Typography, Card, Badge } from "antd";

const { Title, Text } = Typography;

type BookingType = {
  _id: string;
  facility: {
    name: string;
    description: string;
    pricePerHour: number;
  };
  date: string;
  startTime: string;
  endTime: string;
  user: {
    name: string;
    email: string;
  };
  payableAmount: number;
  isBooked: string;
};

interface BookingManagementProps {
  bookings: BookingType[];
}

const BookingManagement: React.FC<BookingManagementProps> = ({ bookings }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Booking Management
      </Title>
      {bookings.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={bookings}
          renderItem={(booking) => (
            <Card
              key={booking._id}
              title={
                <Badge
                  color={booking.isBooked ? "green" : "red"}
                  text={booking.isBooked ? "Booked" : "Pending"}
                />
              }
              style={{ marginBottom: 16 }}
            >
              <Text strong>Facility:</Text> {booking.facility?.name}
              <br />
              <Text strong>User:</Text> {booking.user?.name} (
              {booking.user?.email})
              <br />
              <Text strong>Date:</Text> {booking.date}
              <br />
              <Text strong>Time:</Text> {booking.startTime} - {booking.endTime}
              <br />
              <Text strong>Payable Amount:</Text> ${booking.payableAmount}
            </Card>
          )}
        />
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
};

export default BookingManagement;

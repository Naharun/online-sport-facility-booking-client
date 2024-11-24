import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Row,
  Col,
  Select,
  Card,
  message,
  DatePicker,
} from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useGetFacilitiesQuery } from "../../../redux/api/api"; // Adjust path based on your structure
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const { Title, Text } = Typography;
const { Option } = Select;

// Load Stripe.js with your public key
const stripePromise = loadStripe("your-stripe-public-key");

const BookingPage: React.FC = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const { data: facilitiesResponse, isLoading } = useGetFacilitiesQuery({});
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilityId);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
    null
  );
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const facilities = facilitiesResponse?.data;

  useEffect(() => {
    setSelectedFacilityId(facilityId);
  }, [facilityId]);

  const checkAvailability = () => {
    if (!selectedDate) return;
    const facility = facilities?.find(
      (f: { _id: string | undefined }) => f._id === selectedFacilityId
    );
    if (facility) {
      setAvailableSlots(["02:00 - 13:00", "15:00 - 23:59"]);
    }
  };

  const handlePayment = async () => {
    if (!selectedStartTime || !selectedEndTime) {
      message.error("Please select a valid start and end time.");
      return;
    }

    if (!paymentMethodId) {
      message.error("Please enter a payment method.");
      return;
    }

    try {
      const bookingId = "your-booking-id"; // Replace with actual booking ID
      const response = await fetch(
        "https://sports-facilities-booking.vercel.app/api/bookings/proceedToPay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
            paymentMethodId,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        message.success("Payment successful and booking confirmed!");
      } else {
        message.error(result.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      message.error("Payment processing failed. Please try again.");
    }
  };

  const handleCardChange = async (event: any) => {
    if (event.complete) {
      const { paymentMethod } = await stripe!.createPaymentMethod({
        type: "card",
        card: elements!.getElement(CardElement)!,
      });
      setPaymentMethodId(paymentMethod?.id || null);
    }
  };

  if (isLoading) return <Text>Loading facilities...</Text>;

  const facility = Array.isArray(facilities)
    ? facilities.find(
        (f: { _id: string | undefined }) => f._id === selectedFacilityId
      )
    : null;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Booking Page
      </Title>

      <Text style={{ display: "block", marginBottom: "20px" }}>
        This page will guide you through the steps of booking a facility. Please
        follow the instructions below:
      </Text>

      <Text style={{ display: "block", marginBottom: "10px" }}>
        <strong>Step 1:</strong> Select the facility you wish to book.
      </Text>

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Select
            style={{ width: "100%" }}
            placeholder="Select a facility"
            onChange={(value) => setSelectedFacilityId(value)}
            value={selectedFacilityId}
          >
            {facilities?.map(
              (facility: {
                _id: React.Key | null | undefined;
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => (
                <Option key={facility._id} value={facility._id}>
                  {facility.name}
                </Option>
              )
            )}
          </Select>
        </Col>
      </Row>

      {facility ? (
        <Card bordered style={{ marginBottom: "20px" }}>
          <Title level={4}>{facility.name}</Title>
          <Text>{facility.details}</Text>
        </Card>
      ) : (
        <Text>Facility not found</Text>
      )}

      <Text style={{ display: "block", marginBottom: "10px" }}>
        <strong>Step 2:</strong> Choose a date for your booking.
      </Text>

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(date) =>
              setSelectedDate(date ? dayjs(date).format("YYYY-MM-DD") : null)
            }
          />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={checkAvailability}
            style={{ width: "100%" }}
          >
            Check Availability
          </Button>
        </Col>
      </Row>

      <Text style={{ display: "block", marginBottom: "10px" }}>
        <strong>Step 3:</strong> Select an available time slot.
      </Text>
      <Row gutter={[16, 16]}>
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Col key={index} span={12}>
              <Card
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {slot}
              </Card>
            </Col>
          ))
        ) : (
          <Text>No available slots for this date.</Text>
        )}
      </Row>

      {availableSlots.length > 0 && (
        <>
          <Text style={{ display: "block", marginBottom: "10px" }}>
            <strong>Step 4:</strong> Select your preferred start and end times.
          </Text>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col span={12}>
              <Title level={5}>Start Time</Title>
              <Select
                style={{ width: "100%" }}
                placeholder="Select start time"
                onChange={(value) => setSelectedStartTime(value)}
              >
                {availableSlots.map((slot) => (
                  <Option key={slot} value={slot}>
                    {slot.split(" - ")[0]}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <Title level={5}>End Time</Title>
              <Select
                style={{ width: "100%" }}
                placeholder="Select end time"
                onChange={(value) => setSelectedEndTime(value)}
              >
                {availableSlots.map((slot) => (
                  <Option key={slot} value={slot}>
                    {slot.split(" - ")[1]}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </>
      )}

      {/* Payment Details */}
      <Text style={{ display: "block", marginBottom: "10px" }}>
        <strong>Step 5:</strong> Enter your payment details.
      </Text>
      <CardElement onChange={handleCardChange} />

      <Button
        type="primary"
        onClick={handlePayment}
        disabled={!selectedStartTime || !selectedEndTime || !paymentMethodId}
        style={{ marginTop: "20px", width: "100%" }}
      >
        Proceed to Pay
      </Button>
    </div>
  );
};

export default function BookingPageWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <BookingPage />
    </Elements>
  );
}

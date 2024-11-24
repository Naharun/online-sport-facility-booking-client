import React, { useEffect } from "react";
import {
  Layout,
  Menu,
  Typography,
  Card,
  Table,
  message,
  Spin,
  Avatar,
} from "antd";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/auth/authSlice";
import { useGetUserBookingsQuery } from "../../../redux/api/bookingApi";
import {
  DashboardOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

type BookingType = {
  _id: string;
  facility: { name: string };
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
};

const UserDashboard: React.FC = () => {
  const { user, token } = useSelector(selectAuth);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (!storedUser) {
        message.error("User is not logged in. Redirecting to login page.");
      }
    }
  }, [user]);

  const { data, error, isLoading } = useGetUserBookingsQuery(user?._id, {
    skip: !user || !token,
  });

  const userBookings = data?.data || [];

  if (error) {
    message.error("Failed to fetch bookings. Please try again.");
  }

  // Columns for Ant Design Table
  const columns = [
    {
      title: "Facility",
      dataIndex: ["facility", "name"],
      key: "facility",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      render: (_: any, record: BookingType) =>
        `${record.startTime} - ${record.endTime}`,
      key: "time",
    },
    {
      title: "Payable Amount",
      dataIndex: "payableAmount",
      key: "amount",
      render: (amount: number) => `$${amount}`,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        width={250}
        style={{
          background: "linear-gradient(to right, #2193b0, #6dd5ed)", // Gradient background
          padding: "20px 0",
        }}
        breakpoint="lg"
        collapsedWidth="80"
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar
            size={64}
            style={{
              backgroundColor: "#fff",
              color: "#2193b0",
              marginBottom: "10px",
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <Title level={5} style={{ color: "#fff" }}>
            {user?.name || "User"}
          </Title>
          <Text style={{ color: "#fff", opacity: 0.8 }}>Welcome Back!</Text>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          style={{
            background: "transparent", // Make the menu transparent to show the gradient
            color: "#fff",
            border: "none",
          }}
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined style={{ color: "#fff" }} />,
              label: "Dashboard",
              style: { color: "#fff" }, // Override color for the menu item text
            },
            {
              key: "bookings",
              icon: <ScheduleOutlined style={{ color: "#fff" }} />,
              label: "My Bookings",
              style: { color: "#fff" },
            },
            {
              key: "settings",
              icon: <SettingOutlined style={{ color: "#fff" }} />,
              label: "Settings",
              style: { color: "#fff" },
            },
          ]}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            User Dashboard
          </Title>
          <Text strong>Welcome, {user?.name || "Guest"}!</Text>
        </Header>

        {/* Content */}
        <Content
          style={{ margin: "16px", padding: "24px", background: "#fff" }}
        >
          {/* Summary Cards */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <Card
              style={{ flex: 1 }}
              bordered
              hoverable
              bodyStyle={{ textAlign: "center" }}
            >
              <Title level={4}>Total Bookings</Title>
              <Text strong style={{ fontSize: "20px" }}>
                {userBookings.length}
              </Text>
            </Card>

            <Card
              style={{ flex: 1 }}
              bordered
              hoverable
              bodyStyle={{ textAlign: "center" }}
            >
              <Title level={4}>Upcoming Bookings</Title>
              <Text strong style={{ fontSize: "20px" }}>
                {
                  userBookings.filter(
                    (booking: BookingType) =>
                      new Date(booking.date) >= new Date()
                  ).length
                }
              </Text>
            </Card>
          </div>

          {/* Booking Table */}
          <Title level={4}>My Bookings</Title>
          {isLoading ? (
            <Spin
              size="large"
              style={{ display: "block", margin: "50px auto" }}
            />
          ) : userBookings.length > 0 ? (
            <Table
              dataSource={userBookings}
              columns={columns}
              rowKey="_id"
              bordered
            />
          ) : (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Text>No bookings available</Text>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;

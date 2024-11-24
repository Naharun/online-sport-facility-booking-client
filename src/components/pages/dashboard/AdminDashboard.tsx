import React, { useEffect, useState } from "react";
import {
  Typography,
  Spin,
  message,
  Layout,
  Avatar,
  Card,
  Tabs,
  Button,
  Drawer,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAdminBookingsQuery } from "../../../redux/api/bookingApi";
import FacilityManagement from "./FacilityManagement";
import BookingManagement from "./BookingManagement";
import AddAdmin from "./AddAdmin";
import { selectAuth } from "../../../redux/auth/authSlice";
import {
  UserOutlined,
  CalendarOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

const AdminDashboard: React.FC = () => {
  const { user } = useSelector(selectAuth); // Select user from Redux state
  const navigate = useNavigate();
  const location = useLocation();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Fetch admin bookings using RTK Query
  const { data, error, isLoading } = useGetAdminBookingsQuery({});

  // Redirect unauthorized users
  useEffect(() => {
    if (!user || user.role !== "admin") {
      message.error("Unauthorized access. Redirecting to login.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Extract bookings data safely
  const bookings = data?.data || [];

  // Determine the active tab based on the current path
  const getActiveKey = () => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "1":
        return "1";
      case "2":
        return "2";
      case "3":
        return "3";
      default:
        return "2"; // Default to Booking Management
    }
  };

  // Handle Drawer visibility toggle
  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for Large Screens */}
      <Sider
        theme="light"
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        style={{ display: window.innerWidth < 768 ? "none" : "block" }}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            background: "linear-gradient(to right, #8360c3, #2ebf91)",
            borderRadius: "10px",
            margin: "20px",
          }}
        >
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#fff", color: "#2ebf91" }}
          />
          <Title level={4} style={{ color: "#fff", marginTop: "10px" }}>
            {user?.name || "Admin"}
          </Title>
          <Text style={{ color: "#fff" }}>Admin Dashboard</Text>
        </div>
        <div style={{ padding: "20px" }}>
          <Tabs
            tabPosition="left"
            activeKey={getActiveKey()}
            items={[
              {
                label: "Facility Management",
                key: "1",
                icon: <SettingOutlined />,
              },
              {
                label: "Booking Management",
                key: "2",
                icon: <CalendarOutlined />,
              },
              {
                label: "Add Admin",
                key: "3",
                icon: <UserOutlined />,
              },
            ]}
            onChange={(key) => navigate(`/admin/${key}`)}
          />
        </div>
      </Sider>

      {/* Drawer for Small Screens */}
      <Drawer
        title="Admin Dashboard"
        placement="left"
        onClose={toggleDrawer}
        open={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            background: "linear-gradient(to right, #8360c3, #2ebf91)",
            borderRadius: "10px",
            margin: "20px",
          }}
        >
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#fff", color: "#2ebf91" }}
          />
          <Title level={4} style={{ color: "#fff", marginTop: "10px" }}>
            {user?.name || "Admin"}
          </Title>
          <Text style={{ color: "#fff" }}>Admin Dashboard</Text>
        </div>
        <Tabs
          tabPosition="top"
          activeKey={getActiveKey()}
          items={[
            {
              label: "Facility Management",
              key: "1",
              icon: <SettingOutlined />,
            },
            {
              label: "Booking Management",
              key: "2",
              icon: <CalendarOutlined />,
            },
            {
              label: "Add Admin",
              key: "3",
              icon: <UserOutlined />,
            },
          ]}
          onChange={(key) => {
            toggleDrawer();
            navigate(`/admin/${key}`);
          }}
        />
      </Drawer>

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{
              display: window.innerWidth < 768 ? "inline-block" : "none",
            }}
          />
          <div>
            <Title level={3} style={{ marginTop: 60 }}>
              Welcome Back, Admin!
            </Title>
            <Text type="secondary">Stay updated in your admin portal</Text>
          </div>
          <Avatar
            size="large"
            src={`https://joeschmoe.io/api/v1/${user?.name || "random"}`}
          />
        </Header>
        <Content style={{ padding: "20px" }}>
          {isLoading ? (
            <Spin size="large" />
          ) : error ? (
            <p style={{ color: "red" }}>Error fetching bookings: {}</p>
          ) : (
            <Card
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  Dashboard Overview
                </Title>
              }
              style={{ marginBottom: "20px", marginTop: "20px" }}
            >
              <Tabs
                activeKey={getActiveKey()}
                onChange={(key) => navigate(`/admin/${key}`)}
              >
                <TabPane tab="Facility Management" key="1">
                  <FacilityManagement />
                </TabPane>
                <TabPane tab="Booking Management" key="2">
                  <BookingManagement bookings={bookings} />
                </TabPane>
                <TabPane tab="Add Admin" key="3">
                  <AddAdmin />
                </TabPane>
              </Tabs>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

import React, { useEffect } from "react";
import { Typography, Card, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { setAuthUser } from "../../../redux/auth/authSlice";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(setAuthUser(JSON.parse(storedUser)));
      } else {
        message.error("You need to log in to access the dashboard.");
        navigate("/login");
      }
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "user") {
        navigate("/user/dashboard");
      } else {
        message.error("Unauthorized access.");
        navigate("/login");
      }
    }
  }, [user, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>
        Welcome to your Dashboard, {user?.role === "admin" ? "Admin" : "User"}
      </Title>
      <Card style={{ marginTop: 20 }}>
        <p>This is your personalized dashboard.</p>
        <Button type="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Card>
    </div>
  );
};

export default Dashboard;

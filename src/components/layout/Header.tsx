import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/auth/authSlice";
import { RootState } from "../../redux/store";
import { Button, Modal } from "antd";
import Login from "../../components/pages/authentication/Login";
import Registration from "../../components/pages/authentication/Registration";
import { FcSportsMode } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state: RootState) => state.auth);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className="header-container"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            color: "#fff",
            fontSize: 24,
            backgroundColor: "darkred",
            padding: "10px 50px",
          }}
        >
          <div
            style={{
              gap: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FcSportsMode size={30} />
            <p style={{ margin: 0 }}>GameSpace</p>
          </div>
        </div>

        <div
          style={{
            marginLeft: "-8px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "khaki",
            padding: "15px 20px",
            transform: "skew(-20deg)",
            flexGrow: 1,
            justifyContent: "start",
          }}
        >
          <div style={{ transform: "skew(20deg)" }}>
            <FaSearch style={{ color: "#666" }} />
            <input
              type="text"
              placeholder="Search"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                fontSize: 16,
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          fontSize: 16,
          padding: "16.3px 20px",
          transform: "skew(-20deg)",
        }}
      >
        <div style={{ transform: "skew(20deg)" }}>
          {token ? (
            // Display user profile and logout when logged in
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <p style={{ margin: 0 }}>Welcome, {user?.name || "User"}!</p>
              <Button type="link" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            // Display Login and Register options when logged out
            <div style={{ display: "flex", gap: 20 }}>
              <p
                style={{
                  margin: 0,
                  cursor: "pointer",
                }}
                onClick={() => setIsRegisterModalVisible(true)}
              >
                Sign Up
              </p>
              <p
                style={{
                  margin: 0,
                  cursor: "pointer",
                  borderLeft: "1px solid black",
                  paddingLeft: 20,
                }}
                onClick={() => setIsLoginModalVisible(true)}
              >
                Log In
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        title="Login"
        visible={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)}
        footer={null}
      >
        <Login />
      </Modal>

      {/* Registration Modal */}
      <Modal
        title="Register"
        visible={isRegisterModalVisible}
        onCancel={() => setIsRegisterModalVisible(false)}
        footer={null}
      >
        <Registration />
      </Modal>
    </div>
  );
};

export default Header;

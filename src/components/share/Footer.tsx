import React from "react";
import { Link } from "react-router-dom";
import { FcSportsMode } from "react-icons/fc";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Website Logo and Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FcSportsMode size={30} />
          <p style={{ fontSize: "20px", margin: 0 }}>GameSpace</p>
        </div>

        {/* Page Links */}
        <div style={{ display: "flex", gap: "30px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/feater" style={{ color: "white", textDecoration: "none" }}>
            Sport & Facility
          </Link>
          <Link
            to="/booking"
            style={{ color: "white", textDecoration: "none" }}
          >
            Booking
          </Link>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
          <Link
            to="/contact"
            style={{ color: "white", textDecoration: "none" }}
          >
            Contact Us
          </Link>
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        </div>

        {/* Social Media Links */}
        <div style={{ display: "flex", gap: "15px" }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "20px" }}
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "20px" }}
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "20px" }}
          >
            <FaTwitter />
          </a>
        </div>

        {/* Copyright Section */}
        <p style={{ margin: 0, fontSize: "14px" }}>
          &copy; {new Date().getFullYear()} GameSpace. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

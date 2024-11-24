import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        fontWeight: "bold",
        justifyContent: "center",
        backgroundColor: "lightseagreen",
        padding: "10px 0",
        marginTop: -9,
        boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            ...linkStyle,
            ...(currentPath === "/" ? selectedStyle : {}),
          }}
        >
          Home
        </Link>
      </p>
      <p style={{ margin: 0 }}>
        <Link
          to="/feater"
          style={{
            ...linkStyle,
            ...(currentPath === "/feater" ? selectedStyle : {}),
          }}
        >
          Sport & Facility
        </Link>
      </p>
      <p style={{ margin: 0 }}>
        <Link
          to="/booking"
          style={{
            ...linkStyle,
            ...(currentPath === "/booking" ? selectedStyle : {}),
          }}
        >
          Booking
        </Link>
      </p>
      <p style={{ margin: 0 }}>
        <Link
          to="/about"
          style={{
            ...linkStyle,
            ...(currentPath === "/about" ? selectedStyle : {}),
          }}
        >
          About
        </Link>
      </p>
      <p style={{ margin: 0 }}>
        <Link
          to="/contact"
          style={{
            ...linkStyle,
            ...(currentPath === "/contact" ? selectedStyle : {}),
          }}
        >
          Contact Us
        </Link>
      </p>
      <p style={{ margin: 0 }}>
        <Link
          to="/dashboard"
          style={{
            ...linkStyle,
            ...(currentPath === "/dashboard" ? selectedStyle : {}),
          }}
        >
          Dashboard
        </Link>
      </p>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "5px 10px",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
};

const selectedStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  color: "black",
};

export default Navbar;

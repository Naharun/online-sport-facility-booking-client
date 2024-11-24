// import { Button } from "antd";
// import "./Banner.css";
// import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
// import { FaSearch } from "react-icons/fa";
// import { MdBookOnline } from "react-icons/md";
// import { FcSportsMode } from "react-icons/fc";
// const Banner = () => {
//   return (
//     <>
//       <div className="banner">
//         <div
//           style={{
//             position: "absolute",
//             marginTop: "10px",

//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             width: "40%",
//             height: "60%",
//             textAlign: "center",
//             paddingTop: 40,
//             paddingRight: "20px",
//             marginLeft: "100px",
//             color: "white",
//             fontSize: 20,
//           }}
//         >
//           <h1>Your Game, Your Time</h1>
//           <h1>Book Your Sport Now!</h1>
//           <a style={{ color: "white" }} href="#">
//             Registration for 2024/2025 are open -Find your club now
//           </a>

//           <Button
//             style={{ backgroundColor: "khaki", padding: "20px", marginTop: 20 }}
//           >
//             Book now <ArrowRightOutlined />
//           </Button>
//         </div>
//       </div>
//       <div
//         style={{
//           backgroundColor: "darkred",
//           color: "white",
//           display: "flex",
//           justifyContent: "space-around",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//           <span>
//             <FaSearch />
//           </span>
//           <h3>Find sports facilities</h3>
//           <span>
//             <RightOutlined />
//           </span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//           <MdBookOnline />
//           <h3>Book online/enquire</h3>
//           <RightOutlined />
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
//           <span style={{ fontSize: 25 }}>
//             <FcSportsMode />
//           </span>

//           <h3>Play your game</h3>
//           <RightOutlined />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;
import { Button } from "antd";
import "./Banner.css";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import { FaSearch } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { FcSportsMode } from "react-icons/fc";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <div className="banner-content">
          <h1>Your Game, Your Time</h1>
          <h1>Book Your Sport Now!</h1>
          <a href="#" className="registration-link">
            Registration for 2024/2025 are open - Find your club now
          </a>

          <Button className="book-now-btn">
            Book now <ArrowRightOutlined />
          </Button>
        </div>
      </div>
      <div className="info-section">
        <div className="info-item">
          <FaSearch className="info-icon" />
          <h3>Find sports facilities</h3>
          <RightOutlined />
        </div>
        <div className="info-item">
          <MdBookOnline className="info-icon" />
          <h3>Book online/enquire</h3>
          <RightOutlined />
        </div>
        <div className="info-item">
          <FcSportsMode className="info-icon" />
          <h3>Play your game</h3>
          <RightOutlined />
        </div>
      </div>
    </>
  );
};

export default Banner;

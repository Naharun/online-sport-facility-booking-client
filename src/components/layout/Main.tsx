import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "../share/Navbar";
import Footer from "../share/Footer";

const Main = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;

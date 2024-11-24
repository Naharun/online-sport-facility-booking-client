import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/home/Home";
import App from "../App";
import FeaturedFacilities from "../components/pages/card/FeaturedFacilities";
import AllFacilities from "../components/pages/card/AllFacilities";
import BlogSection from "../components/pages/blog/BlogSection";
import BlogPostDetail from "../components/pages/blog/BlogPostDetail";
import AboutUs from "../components/pages/home/AboutUs";
import CompanyInfo from "../components/pages/home/CompanyInfo";
import ContactUs from "../components/pages/home/ContactUs";
import Login from "../components/pages/authentication/Login";
import Registration from "../components/pages/authentication/Registration";
import BookingPage from "../components/pages/booking/BookingPage";
import Dashboard from "../components/pages/dashboard/Dashboard";
import UserDashboard from "../components/pages/dashboard/UserDashboard";
import AdminDashboard from "../components/pages/dashboard/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/feater",
        element: <FeaturedFacilities />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/all-facilities",
        element: <AllFacilities />,
      },

      {
        path: "/blog",
        element: <BlogSection />,
      },
      {
        path: "/blog/:id",
        element: <BlogPostDetail />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/company-info",
        element: <CompanyInfo />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/user/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/:key",
        element: <AdminDashboard />,
      },
    ],
  },
]);
export default router;

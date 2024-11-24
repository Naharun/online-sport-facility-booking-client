import TestimonialsSlider from "../../Testiminial/TestimonialsSlider";
import BlogSection from "../blog/BlogSection";
import FeaturedFacilities from "../card/FeaturedFacilities";
import Banner from "./Banner";
import HowItWorks from "./howItWork/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedFacilities />
      <HowItWorks />
      <TestimonialsSlider />
      <BlogSection />
    </div>
  );
};

export default Home;

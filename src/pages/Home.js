import React, { useContext } from "react";
import HeroSection from "../components/UI/HeroSection";
import WhyUs from "../components/UI/WhyUs";
import UserContext from "./../contexts/UserContext";
import PricingContainer from "../components/UI/pricing/PricingContainer";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="home">
      {user ? (
        <>
          {" "}
          <HeroSection />
        </>
      ) : (
        <div className="home">
          <h1> Welcome to (Marketing Platform)</h1>
          <p>
            This is where you will be able to monitor all levels of your online
            presence in one spot!{" "}
          </p>
          <ul style={{ alignItems: "center" }}>
            <li>Social Media Posts</li>
            <li>Website</li>
            <li>Google my business</li>
            <li>Something else</li>
          </ul>
        </div>
      )}
      <WhyUs />
      <PricingContainer />
    </div>
  );
};

export default Home;

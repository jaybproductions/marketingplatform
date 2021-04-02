import React, { useContext, useState } from "react";
import HeroSection from "../components/UI/HomePageUI/HeroSection";
import WhyUs from "../components/UI/HomePageUI/WhyUs";
import UserContext from "./../contexts/UserContext";
import PricingContainer from "../components/UI/HomePageUI/pricing/PricingContainer";
import HowItWorks from "../components/UI/HomePageUI/HowItWorks";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home">
      {!user ? (
        <>
          {" "}
          <div className="hero">
            <HeroSection />
          </div>
          <WhyUs />
          <HowItWorks />
          <PricingContainer />
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
            <li>Your Server Instances</li>
            <li>Something else</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;

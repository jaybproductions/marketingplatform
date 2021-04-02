import React, { useContext, useState } from "react";
import HeroSection from "../components/HomePageUI/HeroSection";
import WhyUs from "../components/HomePageUI/WhyUs";
import UserContext from "./../contexts/UserContext";
import PricingContainer from "../components/HomePageUI/pricing/PricingContainer";
import HowItWorks from "../components/HomePageUI/HowItWorks";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home">
      <div className="hero">
        <HeroSection />
      </div>
      <WhyUs />
      <HowItWorks />
      <PricingContainer />
    </div>
  );
};

export default Home;

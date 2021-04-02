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

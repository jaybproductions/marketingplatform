import React, { useContext, useState } from "react";
import HeroSection from "../components/HomePageUI/HeroSection";
import WhyUs from "../components/HomePageUI/WhyUs";
import UserContext from "./../contexts/UserContext";
import PricingContainer from "../components/HomePageUI/pricing/PricingContainer";
import HowItWorks from "../components/HomePageUI/HowItWorks";
import Faq from "../components/HomePageUI/Faq";

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
      <Faq />
    </div>
  );
};

export default Home;

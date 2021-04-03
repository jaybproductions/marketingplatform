import React, { useContext, useState } from "react";
import HeroSection from "../components/HomePageUI/HeroSection";
import WhyUs from "../components/HomePageUI/WhyUs";
import PricingContainer from "../components/HomePageUI/pricing/PricingContainer";
import HowItWorks from "../components/HomePageUI/HowItWorks";
import Faq from "../components/HomePageUI/Faq";
import Contact from "../components/HomePageUI/Contact";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <HeroSection />
      </div>
      <WhyUs />
      <HowItWorks />
      <PricingContainer />
      <Faq />
      <Contact />
    </div>
  );
};

export default Home;

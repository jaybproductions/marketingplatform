import React, { useContext } from "react";
import HeroSection from "../components/UI/HomePageUI/HeroSection";
import WhyUs from "../components/UI/HomePageUI/WhyUs";
import UserContext from "./../contexts/UserContext";
import PricingContainer from "../components/UI/HomePageUI/pricing/PricingContainer";
import HowItWorks from "../components/UI/HomePageUI/HowItWorks";
import HomeInstanceCard from "../components/UI/HomePageUI/HomeInstanceCard";
//!Todo change to !user to show sales page
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
          <h1> Welcome, {user.displayName}</h1>
          <HomeInstanceCard user={user.uid} />
        </div>
      )}
    </div>
  );
};

export default Home;

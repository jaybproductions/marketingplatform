import React from "react";
import "./Hero.css";
import Paper from "@material-ui/core/Paper";
import HeroImg from "../../images/heroimage.png";
import HeroImg2 from "../../images/twilio.png";

const HeroSection = () => {
  function closeMenuAndGoTo(query) {
    document.querySelector("#hero-menu").classList.toggle("ft-menu--js-show");
    setTimeout(() => {
      const element = document.querySelector(query);
      window.scrollTo({
        top: element.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }, 250);
  }

  return (
    <>
      <header className="hero container-fluid position-relative border-bottom">
        <div className="dashboard-button">Hello</div>
        <div className="hero__content container flex-grow-1 mx-auto">
          <div className="text-center col-lg-8 px-0 mx-auto mb-5">
            <h2 className="hero__title mb-3">
              <span className="highlight">Wordpress Hosting</span>
              <br />
              The effortless way.
            </h2>
            <p className="hero__paragraph mb-5">
              With a powerful marketing platform built in
            </p>
            <p className="hero__paragraph mb-5">
              Starting at <span class="highlight">$10/m</span>
            </p>

            <div>
              <a className="btn btn-primary" href="#why-heading">
                See Features
              </a>
            </div>
          </div>
          <div className="block-24">
            <div className="container">
              <div className="logos">
                <img
                  className="logos__img"
                  src={HeroImg}
                  width="100%"
                  height="100%"
                />
                <img className="logos__img" src={HeroImg2} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeroSection;

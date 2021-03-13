import React from "react";
import "./Hero.css";
import Paper from "@material-ui/core/Paper";
import HeroImg from "../../../images/heroimage.png";
import HeroImg2 from "../../../images/twilio.png";

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
      <header class="hero container-fluid position-relative border-bottom">
        <div class="hero__content container flex-grow-1 mx-auto">
          <div class="text-center col-lg-8 px-0 mx-auto mb-5">
            <h2 class="hero__title mb-3">
              <span class="highlight">Wordpress Hosting</span>
              <br />
              The effortless way.
            </h2>
            <p class="hero__paragraph mb-5">
              With a powerful marketing platform built in
            </p>
            <p class="hero__paragraph mb-5">
              Starting at <span class="highlight">$10/m</span>
            </p>

            <div>
              <a class="btn btn-primary" href="#why-heading">
                See Features
              </a>
            </div>
          </div>
          <div class="block-24">
            <div class="container">
              <div class="logos">
                <img
                  class="logos__img"
                  src={HeroImg}
                  width="100%"
                  height="100%"
                />
                <img class="logos__img" src={HeroImg2} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeroSection;

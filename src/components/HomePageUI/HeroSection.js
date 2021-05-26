import React from "react";
import "../../css/Hero.css";
import { Paper, Button, ButtonGroup, Typography } from "@material-ui/core";
import HeroImg from "../../images/heroimage.png";
import HeroImg2 from "../../images/twilio.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <header className="hero container-fluid position-relative border-bottom">
        <div className="header-container">
          {" "}
          <div className="links">
            <a
              onClick={() =>
                document
                  .getElementById("why-heading")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Why Us
            </a>
            <a
              onClick={() =>
                document
                  .getElementById("pricing")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Pricing
            </a>
            <a
              onClick={() =>
                document
                  .getElementById("faq")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              FAQ
            </a>
            <a
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact
            </a>
          </div>
          <div className="dashboard-button">
            <div className="login-button">
              <Button
                variant="contained"
                color="primary"
                to="/login"
                component={Link}
                size="small"
              >
                Login
              </Button>
            </div>
            <div className="signup-button">
              <Button
                variant="contained"
                color="secondary"
                to="/checkout/1"
                component={Link}
                size="small"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        <div className="hero__content container flex-grow-1 mx-auto">
          <div className="text-center col-lg-8 px-0 mx-auto mb-5">
            <h2 className="hero__title mb-3">
              <span className="highlight">Cloud Hosting</span>
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
              <a
                className="btn btn-primary"
                onClick={() =>
                  document
                    .getElementById("why-heading")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                See Features
              </a>
            </div>
          </div>
        </div>
        <div className="logo-container">
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
      </header>
    </>
  );
};

export default HeroSection;

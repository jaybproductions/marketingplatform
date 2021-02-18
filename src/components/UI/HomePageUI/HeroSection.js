import React from "react";
import "./Hero.css";
import Paper from "@material-ui/core/Paper";
import HeroImg from "../../../images/heroimage.png";
import HeroImg2 from "../../../images/twilio.png";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Paper>
        <div className="jumbotron jumbotron-fluid">
          <h1 className="display-4">More than just hosting.</h1>
          <p className="lead">
            Affordable Wordpress hosting with a robust marketing platform behind
            it.
          </p>
          <hr className="my-4" />
          <p>
            We use Amazon Lightsail with Wordpress for an affordable, scalable
            option for all types of hosting needs. <br />
            <br />
            <img src={HeroImg} width="300px" style={{ paddingRight: "0px" }} />
            <img src={HeroImg2} width="200px" style={{ paddingLeft: "0px" }} />
          </p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              See Pricing{" "}
            </a>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default HeroSection;

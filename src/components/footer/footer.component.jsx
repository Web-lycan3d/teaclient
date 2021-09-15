/** @format */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

import "./footer.styles.scss";

const Footer = () => {
  return (
    <Fragment>
      <div className="footer-container">
        <div className="contact-us-container">
          <Link className="get-in-touch" to="/contact">
            Get in touch with us!
          </Link>
          <div className="social-media-links">
            <Link
              to={{ pathname: "https://www.linkedin.com/company/tea-in-box" }}
              target="_blank">
              <AiFillLinkedin className="social-icons" />
            </Link>
            <Link
              to={{
                pathname:
                  "https://instagram.com/tea_in_box?utm_medium=copy_link",
              }}
              target="_blank">
              <AiFillInstagram className="social-icons" />
            </Link>
            <Link
              to={{ pathname: "https://twitter.com/Tea_In_Box?s=20" }}
              target="_blank">
              <AiFillTwitterCircle className="social-icons" />
            </Link>
            <Link
              to={{
                pathname:
                  "https://www.youtube.com/channel/UC7irvlP4349vXdNJUmD6N4w",
              }}
              target="_blank">
              <AiFillYoutube className="social-icons" />
            </Link>
          </div>
          <div className="privacy-links">
            <Link to="/terms_conditions" className="privacy-link">
              Terms and Conditions
            </Link>
            <Link to="/privacy_policies" className="privacy-link">
              Privacy Policies
            </Link>
          </div>
        </div>
        <div className="other-details-container">
          <div className="about-container">
            <Link to="/about" className="about-text">
              About tea in box
            </Link>
            <span className="address">
              IKP-EDEN, Koramangala Bangalore, Karnataka India
            </span>
          </div>
          <div className="divider">
            <div className="vl"></div>
          </div>
          <div className="logo-container">
            <h1 className="footer-logo">Tea In BOX</h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;

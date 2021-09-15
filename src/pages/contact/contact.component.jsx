/** @format */

import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./contact.styles.scss";

const Contact = () => {
  return (
    <Fragment>
      <div className="contact-container">
        <div className="contact-img ">
          <img
            src="https://i.ibb.co/9Z6D3FG/contact-img-min-1.webp"
            alt="error"
            className="img-fluid"
          />
        </div>
        <div className="contact-text">
          <h1>Let's get in touch</h1>
          <p>
            Every good conversation starts with a warm cup of tea, the tea's on
            us!
          </p>
          <p>Give us a call at +91 8123115590</p>
          <p>Mail us at support@teainbox.in</p>
          <p>Or pay us a visit at IKP Eden , Koramangala , Bengaluru 560076.</p>
          <Link
            to={{ pathname: "https://goo.gl/maps/Yttm7845s91KZ2Bx7" }}
            target="_blank"
            className="google-link">
            Click here to get directions on Google maps
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;

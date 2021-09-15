/** @format */

import React from "react";
import { withRouter } from "react-router-dom";
import "./collection-item.styles.scss";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  once: true,
});

function CollectionItems({ imageUrl, history, name, homeState }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      data-aos-delay="300"
      className="collection-item"
      onClick={() => history.push(`/tea`)}>
      <div className={homeState ? "image home-page" : "image"}>
        <img src={imageUrl} alt="error" />
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default withRouter(CollectionItems);

/** @format */

import React, { Fragment, Component } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import CollectionItems from "../../components/collection-item/collection-item.component";
import "./homepage.styles.scss";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const bolder = {
  fontWeight: 700,
};
AOS.init({
  once: true,
});

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bestSellers: [
        {
          id: 1,
          linkUrl: "/tea",
          imageUrl: "https://i.ibb.co/wN0NYR5/lava1kgfront.jpg",
          name: "Lava|1000gm"
        },
        {
          id: 2,
          linkUrl: "/tea",
          imageUrl: "https://i.ibb.co/LNKLvMc/man500front.jpg",
          name: "Manorama|500gm"
        },
        {
          id: 3,
          linkUrl: "/tea",
          imageUrl: "https://i.ibb.co/HPyWsQh/madh1lkgfront.jpg",
          name: "Madheshwar|1000gm"
        },
      ],
      width: window.innerWidth,
      breakpoint: 1060,
    };
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      () => (this.state.width = window.innerWidth)
    );
  }

  render() {
    return (
      <Fragment>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          exit={{ opacity: 0 }}
          src={
            this.state.width < this.state.breakpoint
              ? "https://i.ibb.co/XS5q00V/landing-img-mob-min-Hnu0-AQ.webp"
              : "https://i.ibb.co/4Sf7FmR/landing-img-min-a3y-Sv8.webp"
          }
          alt="error"
          className="img-fluid-2"
        />
        <div
          className="landing-quote"
          data-aos="fade-up"
          data-aos-duration="2000">
          <p>
            "We are like Tea, we don't know our strength until we're in hot
            water"
          </p>
          <span>
            <b>- SISTER BUSCHE</b>
          </span>
        </div>
        <div className="img-container  home-bottom-img">
          <img
            src={
              this.state.width < this.state.breakpoint
                ? "https://i.ibb.co/nbKVzCm/Webp-net-compress-image-7.webp"
                : "https://i.ibb.co/3B5p8qx/freshest-tea-leaf-mi-Lt-YWZ.webp"
            }
            alt="freahest tea leafs"
            className="img-fluid"
          />
          <div className="freashest-tea-content">
            <h1 data-aos="fade-right" data-aos-duration="2000">
              We bring you the freshest tea
            </h1>
            <p
              data-aos="fade-right"
              data-aos-duration="2000"
              data-aos-delay="200">
              From the foothills of the Maikaal mountain range, harvested at an
              elevation of 3600ft, Tea in Box plucks the perfect quality tea
              leaves at the Sangam of the mighty rivers of Lava, Manorama &
              Madheshwar.
            </p>
          </div>
        </div>
        <div className="heading-text">
          <h1 data-aos="fade-in" data-aos-duration="3000">
            FROM the CROP TO your cup
          </h1>
        </div>
        <div
          className="img-fluid-3 crop-img"
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="200">
          <img
            src="/images/homepage/plantation_to_cup.png"
            alt="From Plantation to Your Cup"
          />
        </div>
        <div
          className="heading-text"
          data-aos="fade-in"
          data-aos-duration="3000">
          <p className="crop-ptag">
            Our brew is a bouquet full of health & happiness{" "}
          </p>
        </div>
        <div className="img-container home-body-img">
          <img
            src={
              this.state.width < this.state.breakpoint
                ? "https://i.ibb.co/LnBphtw/Webp-net-compress-image-10.webp"
                : "https://i.ibb.co/mbnzjw0/Webp-net-compress-image-8.webp"
            }
            alt="tea leafs"
            className="img-fluid"
          />
          <div className="order-yours-content">
            <p data-aos="fade-up" data-aos-duration="2000">
              We bring you the most therapeutic & heartwarming cup of tea, that
              exudes the finest flavour in every sip.
            </p>
            <h1
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="300">
              The roots of tradition, the splendour of taste
            </h1>
            <div
              className="margin-30"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="400">
              <CustomButton onClick={() => (window.location.href = "/tea")}>
                Order yours today
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="heading-text">
          <h1 style={bolder}>Explore Our Bestsellers</h1>
        </div>
        <div className="margin-30">
          <Link to="/tea">
            <button className="shop-now-btn">SHOP NOW</button>
          </Link>
        </div>
        <div className="collection-preview">
          {this.state.bestSellers.map(({ id, name ,...otherProps }) => (
            <CollectionItems key={id} {...otherProps} name={name} homeState={true} />
          ))}
        </div>
        <div className="img-container home-bottom-img">
          <img
            src={
              this.state.width < this.state.breakpoint
                ? "https://i.ibb.co/vcfvf8k/Webp-net-compress-image-6.webp"
                : "https://i.ibb.co/kcPfXg8/kettle-min-8o-CCtx.webp"
            }
            alt="error"
            className="img-fluid"
          />
          <div
            data-aos="fade-in"
            data-aos-duration="3000"
            className="image-content3 ">
            <h1>We make exquisite tea accessible to the masses</h1>
            <p>
              We make every cup of tea with love and care without compromising
              on quality offering an authentic experience while at the mean time
              not exploiting our environment and our society.
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Homepage;

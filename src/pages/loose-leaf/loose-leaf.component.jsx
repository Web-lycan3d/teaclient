/** @format */

import React, { Component, Fragment } from "react";
import { Link } from "react-scroll";
import { AiFillCaretDown } from "react-icons/ai";
import CollectionItems from "../../components/collection-item/collection-item.component";
import "./loose-leaf.styles.scss";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  once: false,
});

export class LooseLeaf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flavours: [
        {
          id: 1,
          name: "Madheswar",
          linkUrl: "/products",
          imageUrl: "/images/loose-leaf/manorama.png",
        },
        {
          id: 2,
          name: "Manorma",
          linkUrl: "/products",
          imageUrl: "/images/loose-leaf/madheshwar.png",
        },
        {
          id: 3,
          name: "Lava",
          linkUrl: "/products",
          imageUrl: "/images/loose-leaf/lava.png",
        },
      ],
    };
  }
  render() {
    return (
      <Fragment>
        <div className="img-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            exit={{ opacity: 0 }}
            className="looseleafimg">
            <img
              src="https://images.pexels.com/photos/2884905/pexels-photo-2884905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="freahest tea leafs"
            />
          </motion.div>
          <div className="landing-content">
            <h1
              data-aos="fade-left"
              data-aos-duration="2000"
              data-aos-delay="700">
              Loose Leaf
            </h1>
            <p
              data-aos="fade-left"
              data-aos-duration="2000"
              data-aos-delay="900">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, dolorem mollitia. Nemo ut incidunt ipsum temporibus
              iure fugiat rem atque neque voluptate asperiores, magnam eaque
              fuga cum doloribus dignissimos nisi?
            </p>
          </div>
          {/* <div className="looseleaf-text-overlay">
            <h2>Loose Leaf</h2>
          </div> */}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="explore">
          <h3>Explore</h3>
          <Link to="anchor" spy={true}>
            <AiFillCaretDown className="down-icon" />
          </Link>
        </motion.div>
        <div className="text-img-container">
          <div className="text">
            <h1 data-aos="fade-up" data-aos-duration="2000">
              choose from our gourmet flavors
            </h1>
            <p data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, dolorem mollitia. Nemo ut incidunt ipsum temporibus
              iure fugiat rem atque neque voluptate asperiores, magnam eaque
              fuga cum doloribus dignissimos nisi?Nemo ut incidunt ipsum
              temporibus iure fugiat rem atque neque voluptate asperiores,
              magnam eaque fuga cum doloribus dignissimos nisi?
            </p>
          </div>
          <div className="side-img" id="anchor">
            <img
              src="./images/loose-leaf/gourmet_flavour.png"
              alt="error"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="collection-preview">
          {this.state.flavours.map(({ id, ...otherProps }) => (
            <CollectionItems key={id} {...otherProps} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default LooseLeaf;

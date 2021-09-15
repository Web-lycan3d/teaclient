/** @format */

import React, { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as Scroll from "react-scroll";
import queryString from "query-string";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Heart from "../../components/svg/Heart";
import TeaProducts from "../../components/productsTea/teaProductArray";
import Products from "../../components/productsLooseLeaf/Products";
import ReactCarousel from "../../components/react-carousel/react-carousel.coponent";
import { addItemtoCart } from "../../redux/cart/cart.action";
import "./single.styles.scss";
import { addFav, unFav } from "../../redux/fav/fav.action";

const SingleProduct = () => {
  const history = useHistory();
  const [favState, setFavState] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const userExists = useSelector((data) => data.user);
  const userFav = useSelector((data) => data?.fav);

  useEffect(() => {
    Scroll.animateScroll.scrollToTop();
    const parsed = queryString.parse(location.search);

    if (id >= 11 && id <= 22) {
      const result = TeaProducts.find((item) => item.id === parseInt(id));
      result && setProduct(result);
    }
    if (id >= 0 && id <= 10) {
      const result = Products.find(
        (item) => item.id === parseInt(parsed.productId)
      );
      const data = result.items?.find((product) => product.id === parseInt(id));
      data && setProduct(data);
    }
  }, [id]);

  useEffect(() => {
    const fav = userFav?.fav?.find((i, index) => {
      return i.id === parseInt(id);
    });

    fav ? setFavState(true) : setFavState(false);
  }, [id, userFav]);

  const handleFav = (itemData) => {
    if (userExists.token) {
      dispatch(addFav(itemData));
    } else {
      history.push({
        pathname: "/login",
        state: { cartMessage: "Login First" },
      });
    }
  };
  const handleunFav = (itemData) => {
    if (userExists.token) {
      dispatch(unFav(itemData));
    } else {
      history.push({
        pathname: "/login",
        state: { cartMessage: "Login First" },
      });
    }
  };
  const handleAddtoCart = (item) => {
    if (userExists.token) {
      dispatch(addItemtoCart(item));
    } else {
      history.push({
        pathname: "/login",
        state: { cartMessage: "Login First" },
      });
    }
  };
  return (
    <div className="single-container">
      <div className="single-contents">
        <div className="single-body-flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="single-left">
            {/* <motion.div className="single-left-text">
              <h1></h1>
            </motion.div> */}
            <motion.div
              transition={{ delay: 1, duration: 2 }}
              className="single-left-img">
              {/* <img src={product.imageURL} alt="error" /> */}
              <ReactCarousel
                img1={product.imageURL}
                img2={product.imageURLExtra1}
                img3={product.imageURLExtra2}
              />
            </motion.div>
          </motion.div>
          <div className="single-right">
            {favState ? (
              <span
                className="fav-icon-fill"
                onClick={() => handleunFav(product)}>
                <Heart />
              </span>
            ) : (
              <span className="fav-icon" onClick={() => handleFav(product)}>
                <Heart />
              </span>
            )}
            <div className="single-right-text">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}>
                {product.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}>
                The exhilarating freshness and soothing goodness of green tea
                blended with abundant nourishment and antioxidants - carefully
                handpicked by our experts for you. A rare connoisseur's delight
                to awaken your senses with the mystical and enchanting taste -
                one sip at a time.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}>
                INR {product.price}
              </motion.p>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4 }}>
                Net wt : {product.quantity} grams
              </motion.span>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                onClick={() => handleAddtoCart(product)}>
                <BsBag className="single-bag-icon" /> Add to my cart
              </motion.button>
              {/* <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}>
                buy now
              </motion.button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

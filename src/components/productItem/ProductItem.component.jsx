/** @format */

import React, { useEffect, useState } from "react";
import Heart from "../svg/Heart";
import { BsBag, BsCheckCircle } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { addItemtoCart } from "../../redux/cart/cart.action";

import "./ProductItem.styles.scss";
import { Link, useHistory } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { addFav, unFav } from "../../redux/fav/fav.action";
import Tooltip from "../Tooltip/Tooltip";

AOS.init({
  once: false,
});
const ProductItem = ({ item, state, productid, fav, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cartIcon, setCarticon] = useState(false);
  const { name, price, imageURL, quantity } = item;
  const userExists = useSelector((data) => data.user);
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

  useEffect(() => {
    cartIcon &&
      setTimeout(() => {
        setCarticon(false);
      }, 2000);
  }, [cartIcon]);
  const handleAddtoCart = (item) => {
    setCarticon(true);
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
    <>
      <div className="product-1-box">
        <div className="product-likes">
          {fav ? (
            <span className="heart-fill" onClick={() => handleunFav(item)}>
              {/* <Heart /> */}
              <Heart />
            </span>
          ) : (
            <span className="heart-icon" onClick={() => handleFav(item)}>
              <Heart />
            </span>
          )}
        </div>

        <div className="product-1-img">
          <Link
            to={`/single/product/${item.id}?state=${state}&productId=${productid}`}>
            <img src={imageURL} alt="error" />
          </Link>
        </div>
        <div className="product-1-text-box">
          <div className="product-1-text">
            <p>
              {name}|{quantity}
            </p>
            <span>INR: {price}</span>
          </div>

          <Tooltip text={!cartIcon ? "Add to cart" : "added"}>
            {" "}
            <div className="product-1-cart">
              {!cartIcon ? (
                <span
                  onClick={() => handleAddtoCart(item)}
                  className="bag-icon"
                  data-tip="Add to Cart">
                  <BsBag />
                </span>
              ) : (
                <span className="bag-icon-2 ">
                  <BsCheckCircle />
                </span>
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default ProductItem;

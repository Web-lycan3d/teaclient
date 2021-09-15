/** @format */

import React, { useEffect, useState } from "react";

import ProductItem from "../productItem/ProductItem.component";
import TeaProducts from "./teaProductArray";
import "./TeaContainer.styles.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";

AOS.init({
  once: true,
});

const TeawareContainer = () => {
  const [favProducts, setFavP] = useState("");

  const TeaWareArray = useSelector((data) => data);

  useEffect(() => {
    TeaWareArray && setFavP(TeaWareArray);
  }, [TeaWareArray]);

  return (
    <>
      <div className="products">
        <div
          className="product-text-teaware"
          data-aos="fade-up"
          data-aos-duration="2000">
          <p className="teaware-header">
            Embark on a journey to vitality with a cup of Tea in Box’s Green
            Tea. It is not just a regular cup of chai, we believe it’s therapy
            for your body. Our Green Tea is proven to contain higher amounts of
            catechins – the potent antioxidants known to possess
            disease-fighting properties and provide several health benefits.
          </p>
        </div>
        <div className="products-teaware">
          {TeaProducts?.map((product, index) =>
            favProducts.fav?.fav?.find((item) => {
              return item.id === product.id;
            }) ? (
              <ProductItem
                id={product.id}
                item={product}
                state={true}
                fav={true}
                key={index}
              />
            ) : (
              <ProductItem
                id={product.id}
                item={product}
                state={true}
                fav={false}
                key={index}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TeawareContainer;

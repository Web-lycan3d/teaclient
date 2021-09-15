/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProductItem from "../productItem/ProductItem.component";
import "./ProductContainer.styles.scss";

const ProductContainer = ({ product }) => {
  const [favitems, setFavItems] = useState("");
  const fav = useSelector((data) => data);
  useEffect(() => {
    fav && setFavItems(fav);
  }, [fav]);

  return (
    <>
      <div className="products">
        <div className="product-text-lava">
          <h3>{product.name}</h3>
          <p>{product.desp}</p>
        </div>
        <div className="products-1">
          {product.items &&
            product.items.map((item) =>
              favitems.fav?.fav?.find((i) => i.id === item.id) ? (
                <ProductItem
                  id={item.id}
                  item={item}
                  state={false}
                  productid={product.id}
                  fav={true}
                />
              ) : (
                <ProductItem
                  id={item.id}
                  item={item}
                  state={false}
                  productid={product.id}
                  fav={false}
                />
              )
            )}
        </div>
      </div>
    </>
  );
};

export default ProductContainer;

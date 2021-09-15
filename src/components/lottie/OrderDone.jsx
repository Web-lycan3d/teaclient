/** @format */

import React from "react";
import Lottie from "react-lottie";
import done from "./8878-done.json";

const OrderDone = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: done,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Lottie options={defaultOptions} height={250} width={250} />
    </>
  );
};

export default OrderDone;

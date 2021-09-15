/** @format */

import React from "react";
import Lottie from "react-lottie";
import done from "./10448-payment-failed-error.json";

const OrderError = () => {
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

export default OrderError;

/** @format */

import React from "react";
import Lottie from "react-lottie";
import heartAni from "./51382-astronaut-light-theme.json";

const LottieAnimation = ({ w, h }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartAni,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Lottie options={defaultOptions} height={h} width={w} />
    </>
  );
};

export default LottieAnimation;

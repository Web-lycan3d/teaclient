/** @format */

import React from "react";
import { TextField } from "@material-ui/core";
import "./input.styles.scss";

const Input = (props, ref) => {
  return <input {...props} className="user-inputs" />;
};

export default Input;

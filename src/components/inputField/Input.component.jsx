/** @format */

import React from "react";
import { TextField } from "@material-ui/core";

const Input = (props, ref) => {
  return (
    <TextField
      variant="standard"
      margin="normal"
      color="secondary"
      fullWidth
      {...props}
    />
  );
};

export default Input;

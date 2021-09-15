/** @format */

import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fa6666",
    border: "2px solid rgba(250, 102, 102, 0)",
    borderRadius: 3,
    boxShadow: "0 5px 20px rgba(250, 102, 102, .4)",
    color: "white",
    height: 43,
    padding: "0 30px",
    margin: theme.spacing(5, 0, 2),
    "&:hover": {
      background: "transparent",
      color: "black",
      border: "2px solid rgba(255, 72, 72, 1)",
      boxShadow: "0 5px 10px rgba(255, 72, 72, .1)",
    },
  },
}));

const SubmitButton = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      className={styles.root}
      variant="contained"
      {...props}>
      {children}
    </Button>
  );
};

export default SubmitButton;

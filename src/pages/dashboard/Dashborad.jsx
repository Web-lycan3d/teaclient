/** @format */

import React from "react";
import "./dash.styles.scss";

import {
  Accordion,
  AccordionSummary,
} from "@material-ui/core";
const Dashborad = () => {
  return (
    <div className="dash-container">
      <Accordion>
        <AccordionSummary>
          <div className="dash--header">update</div>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

export default Dashborad;

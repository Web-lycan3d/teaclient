/** @format */
import React from "react";
import "./tooltip.styles.scss";

const Tooltip = ({ children, text, ...rest }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="tooltip-container">
      <div className={show ? "tooltip-box visible" : "tooltip-box"}>
        <span> {text}</span>

        <span className="tooltip-arrow" />
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;

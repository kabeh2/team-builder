import React from "react";

import classes from "./button.css";

const Button = props => (
  <button
    // disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.type === "reset" ? props.clear : null}
    type={props.type}
  >
    {props.children}
  </button>
);

export default Button;

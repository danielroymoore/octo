import React from "react";

import "./styles.scss";

const Button = ({ id, block, children, onClick }) => {
  return (
    <button
      id={id}
      data-testid={id}
      className={`button ${block ? "button--block" : ""}`}
      onClick={onClick}
    >
      <label className="button__label">{children}</label>
    </button>
  );
};

export default Button;

import React from "react";

const QuantityButton = ({ id, children, disabled, onClick }) => {
  return (
    <button
      id={id}
      data-testid={id}
      className="quantity-button"
      onClick={onClick}
      disabled={disabled}
    >
      <label className="button__label">{children}</label>
    </button>
  );
};

export default QuantityButton;

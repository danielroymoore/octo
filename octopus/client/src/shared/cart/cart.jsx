import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";

import "./styles.scss";
import cartIcon from "../../assets/basket.svg";

import CartPreview from "./cart-preview";

const Cart = () => {
  const { products } = useCart();
  const [showCartPreview, setShowCartPreview] = useState(false);

  const totalProducts = products.reduce(
    (prev, current) => prev + current.quantity,
    0
  );

  return (
    <div className="cart__header-container">
      <button
        data-testid="toggle-cart-button"
        className="cart__header-container__toggle-button"
        onClick={() => setShowCartPreview(!showCartPreview)}
      >
        <img src={cartIcon} alt="shopping cart toggle button" />
      </button>
      <span data-testid="total-in-cart">{totalProducts}</span>
      {showCartPreview && <CartPreview />}
    </div>
  );
};

export default Cart;

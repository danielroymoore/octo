import React from "react";
import Button from "../button/button";
import { useCart } from "../../hooks/useCart";
import QuantityButton from "../button/quantity-button";

const CartPreview = () => {
  const { products, increaseProductQty, decreaseProductQty } = useCart();

  return (
    <div className="cart__preview">
      <h3 className="cart__preview__title">Your Shopping Cart</h3>
      {products.length ? (
        <>
          <ul className="cart__preview__products">
            {products.map((product) => (
              <li key={product.id} className="cart__preview__product">
                <img
                  className="cart__preview__product__image"
                  src={product.image}
                  alt={`${product.title}`}
                />
                <span className="cart__preview__product__title">
                  {product.name}
                </span>
                <QuantityButton
                  onClick={() => decreaseProductQty({ id: product.id })}
                >
                  -
                </QuantityButton>
                <span className="cart__preview__product__quantity">
                  {product.quantity}
                </span>
                <QuantityButton
                  onClick={() => increaseProductQty({ id: product.id })}
                >
                  +
                </QuantityButton>
                <span className="cart__preview__product__price">
                  £{(product.quantity * (product.price / 100)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <Button onClick={() => null} block>
            Checkout
          </Button>
        </>
      ) : (
        <p className="cart__preview__empty">There are no items in your cart.</p>
      )}
    </div>
  );
};

export default CartPreview;

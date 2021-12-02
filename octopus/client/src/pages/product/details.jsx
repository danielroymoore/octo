import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useCart } from "../../hooks/useCart";
import { GET_PRODUCT } from "./queries";
import Button from "../../shared/button/button";
import QuantityButton from "../../shared/button/quantity-button";

import "./styles.scss";

const ProductCost = ({ price }) => {
  if (Number.isInteger(price)) {
    const cost = (price / 100).toString().split(".");
    return (
      <div className="product__cost">
        <span data-testid="pounds" className="product__cost__pounds">
          {cost[0]}
        </span>
        {cost.length > 1 && (
          <span data-testid="pence" className="product__cost__pence">
            .{cost[1]}
          </span>
        )}
      </div>
    );
  }
  return <div className="product__cost">Invalid number format</div>;
};

export { ProductCost };

const Details = ({ productId }) => {
  const { products, addToCart, removeFromCart } = useCart();

  let currentQty =
    products.find((product) => product.id === productId)?.quantity ?? 0;

  const [quantity, setQuantity] = useState(currentQty);

  useEffect(() => {
    setQuantity(currentQty);
  }, [currentQty]);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
  });

  if (loading) return <p>Loading</p>;

  if (error) return <p>Error</p>;

  const { product } = data;

  const updateBasket = () => {
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      image: product.imgUrl,
      price: product.price,
      quantity,
    });
  };

  return (
    <div className="product">
      <div className="product__grid">
        <div className="product__container product__container--dark-blue product__image-container">
          <img
            className="product__image-container__image"
            src={product.imgUrl}
          />
        </div>
        <div className="product__container product__container--light-blue product__name-container">
          <h2 className="product__name-container__name">{product.name}</h2>
          <span className="product__name-container__quantity">
            {product.power} // Packet of {product.quantity}
          </span>
        </div>
        <div className="product__container product__container--dark-blue product__controls">
          <div className="product__controls__quantity">
            <ProductCost price={product.price} />

            <div className="flex flex--column">
              <label className="product__controls__quantity__label">QTY</label>
              <div className="product__controls__quantity__buttons">
                <QuantityButton
                  id="decrease-quantity-button"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 0}
                >
                  -
                </QuantityButton>
                <span
                  className="product__controls__quantity__buttons__total"
                  data-testid="current-quantity"
                >
                  {quantity}
                </span>
                <QuantityButton
                  id="increase-quantity-button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </QuantityButton>
              </div>
            </div>
          </div>
          <Button id="add-to-cart-button" onClick={() => updateBasket()} block>
            Add to cart
          </Button>
          {!!currentQty && (
            <Button
              id="remove-from-cart-button"
              onClick={() => removeFromCart(parseInt(product.id))}
              block
            >
              Remove from cart
            </Button>
          )}
        </div>
        <div className="product__container product__container--light-blue product__description">
          <h4>Description</h4>
          <p>{product.description}</p>
        </div>
        <div className="product__container product__container--dark-blue product__specifications">
          <h4>Specifications</h4>
          <div className="product__specifications__items">
            <div className="flex flex--column product__specifications__items__labels">
              <label>Brand</label>
              <label>Item weight</label>
              <label>Dimensions</label>
              <label>Item model number</label>
              <label>Colour</label>
            </div>
            <div className="flex flex--column product__specifications__items__values">
              <span>{product.brand}</span>
              <span>{product.weight}</span>
              <span>
                L: {product.length} H: {product.height}
              </span>
              <span>{product.modelCode}</span>
              <span>{product.colour}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

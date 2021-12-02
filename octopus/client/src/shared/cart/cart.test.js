import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartContextProvider from "../../context/CartContext";

import Cart from "./cart";

test("It toggles the cart preview", async () => {
  render(
    <CartContextProvider>
      <Cart />
    </CartContextProvider>
  );

  userEvent.click(screen.getByTestId("toggle-cart-button"));
  expect(screen.getByText("Your Shopping Cart")).toBeTruthy();

  userEvent.click(screen.getByTestId("toggle-cart-button"));

  const previewTitle = screen.queryByText("Your Shopping Cart");
  expect(previewTitle).toBeNull();
});

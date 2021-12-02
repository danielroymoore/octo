import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

import App from "./App";

import { getProductMock } from "./pages/product/queries";

test("should be able to increase and decrease product quantity", async () => {
  const { app } = render(
    <MockedProvider mocks={[getProductMock]}>
      <App />
    </MockedProvider>
  );
  await waitFor(() => new Promise((res) => setTimeout(res, 0)));

  userEvent.click(screen.getByTestId("increase-quantity-button"));
  expect(screen.getByTestId("current-quantity")).toHaveTextContent(1);

  userEvent.click(screen.getByTestId("decrease-quantity-button"));
  expect(screen.getByTestId("current-quantity")).toHaveTextContent(0);
});

test("should be able to add items to the basket", async () => {
  const { app } = render(
    <MockedProvider mocks={[getProductMock]}>
      <App />
    </MockedProvider>
  );
  await waitFor(() => new Promise((res) => setTimeout(res, 0)));

  userEvent.click(screen.getByTestId("increase-quantity-button"));
  expect(screen.getByTestId("current-quantity")).toHaveTextContent(1);

  userEvent.click(screen.getByTestId("add-to-cart-button"));
  expect(screen.getByTestId("total-in-cart")).toHaveTextContent(1);
});

test("should be able to clear the basket", async () => {
  const { app } = render(
    <MockedProvider mocks={[getProductMock]}>
      <App />
    </MockedProvider>
  );
  await waitFor(() => new Promise((res) => setTimeout(res, 0)));

  userEvent.click(screen.getByTestId("increase-quantity-button"));
  expect(screen.getByTestId("current-quantity")).toHaveTextContent(1);

  userEvent.click(screen.getByTestId("add-to-cart-button"));
  expect(screen.getByTestId("total-in-cart")).toHaveTextContent(1);

  userEvent.click(screen.getByTestId("remove-from-cart-button"));
  expect(screen.getByTestId("total-in-cart")).toHaveTextContent(0);

  userEvent.click(screen.getByTestId("toggle-cart-button"));
  expect(screen.getByText("There are no items in your cart.")).toBeTruthy();
});

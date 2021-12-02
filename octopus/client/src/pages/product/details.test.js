import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import CartContextProvider from "../../context/CartContext";

import Details, { ProductCost } from "./details";

import { getProductMock, getProductErrorMock } from "./queries";

test("It renders component with a loading message", async () => {
  const { details } = render(
    <MockedProvider mocks={[getProductMock]}>
      <CartContextProvider>
        <Details productId={1} />
      </CartContextProvider>
    </MockedProvider>
  );

  expect(screen.getByText("Loading")).toBeTruthy();
});

test("It renders component with an error message", async () => {
  const { details } = render(
    <MockedProvider mocks={[getProductErrorMock]}>
      <CartContextProvider>
        <Details productId={1} />
      </CartContextProvider>
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 0)));

  expect(screen.getByText("Error")).toBeTruthy();
});

test("It formats prices correctly", () => {
  const { rerender } = render(<ProductCost price={1299} />);
  expect(screen.getByTestId("pounds")).toHaveTextContent("12");
  expect(screen.getByTestId("pence")).toHaveTextContent(".99");

  rerender(<ProductCost price={1200} />);
  expect(screen.getByTestId("pounds")).toHaveTextContent("12");
  expect(screen.queryByTestId("pence")).toBeNull();

  rerender(<ProductCost price="string" />);
  expect(screen.getByText("Invalid number format")).toBeTruthy();
});

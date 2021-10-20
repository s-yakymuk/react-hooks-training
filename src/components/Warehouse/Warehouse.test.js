import React from "react";
import {
  render,
  cleanup,
  screen,
  fireEvent
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Warehouse from "./Warehouse";

jest.mock("uuid");

window.alert = jest.fn();

const setProductsMock = jest.fn();
const setIsTableOpenMock = jest.fn();

const defaultProps = {
  name: "Test Warehouse",
  products: [],
  setProducts: setProductsMock,
  setIsTableOpen: setIsTableOpenMock,
  isTableOpen: false,
}

test("<Warehouse /> render with default props", () => {
  render(
    <Warehouse
      {...defaultProps}
    />
  );
  const { getByRole } = screen;
  const heading = getByRole("heading");

  expect(heading).toHaveTextContent("Test Warehouse");

  const toggleButton = getByRole("button", { name: "Expand Warehouse" });

  userEvent.click(toggleButton);

  expect(setIsTableOpenMock).toBeCalledTimes(1);
  expect(setIsTableOpenMock).toBeCalledWith(true);
});

test("<Warehouse /> render with table open", async () => {
  render(
    <Warehouse
      {...defaultProps}
      isTableOpen={true}
    />
  );
  const heading = screen.getByRole("heading");

  expect(heading).toHaveTextContent("Test Warehouse");

  const submitButton = screen.getByRole("button", { name: "Add" });

  userEvent.click(submitButton);

  expect(screen.getByText("Enter data in all fields!")).toBeInTheDocument();

  const productInput = screen.getByLabelText("Product:");
  const priceInput = screen.getByLabelText("Price:");
  const quantityInput = screen.getByLabelText("Quantity:");

  await fireEvent.change(quantityInput, { target: { value: "250" } });
  await fireEvent.change(productInput, { target: { value: "iPhone 13" } });
  await fireEvent.change(priceInput, { target: { value: "1000" } });

  userEvent.click(submitButton);

  expect(() => screen.getByText("Enter data in all fields!")).toThrowError();

  expect(setIsTableOpenMock).toBeCalledTimes(0);
  expect(setProductsMock).toBeCalledTimes(1);
  expect(setProductsMock).toBeCalledWith([
    {
      name: "iPhone 13",
      quantity: "250",
      price: "1000"
    }
  ]);
});

test("<Warehouse /> render with products", () => {
  render(
    <Warehouse
      {...defaultProps}
      isTableOpen
      products={[
        {
          id: "1",
          name: "iPhone 13",
          price: "1000",
          quantity: "200"
        },
        {
          id: "2",
          name: "iPhone 7",
          price: "500",
          quantity: "200"
        },
      ]}
    />
  );

  expect(screen.getByText("300000")).toBeInTheDocument();
  expect(screen.getByText("Total").nextSibling).toHaveTextContent("300000");

  expect(window.alert).toBeCalledTimes(1);
  expect(window.alert).toBeCalledWith("Too much!");

  screen.debug();
});
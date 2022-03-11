import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import InputForm from "../pages/InputForm";

test("input form page renders correctly", () => {
  const component = renderer.create(<InputForm navigate={undefined} />);
  let tree = component.toJSON();
  // tree
  expect(tree).toMatchSnapshot();
});

describe("Input Form component", () => {
  test("render input-form component", () => {
    render(<InputForm navigate={undefined} />);
  });

  test("country input exists", () => {
    render(<InputForm navigate={undefined} />);
    const inputElement = screen.getByLabelText(/Country name/i)
    expect(inputElement).toBeInTheDocument();
  });

  test("search-button exists", () => {
    render(<InputForm navigate={undefined} />);
    expect(screen.getByRole("search-button")).toBeInTheDocument();
  });

  test("search-button is disabled initially", () => {
    render(<InputForm navigate={undefined} />);
    expect(screen.getByRole("search-button")).toBeDisabled();
  });

  test("value of country input changes when typed in", () => {
    render(<InputForm navigate={undefined} />);
    const inputElement = screen.getByLabelText(/Country name/i) as HTMLInputElement
    fireEvent.change(inputElement, {target: {value: "India"}})
    expect(inputElement.value).toBe("India");
  });

  test("value of country input is empty when typed search button is clicked", () => {
    render(<InputForm navigate={() => {}} />);
    const inputElement = screen.getByLabelText(/Country name/i) as HTMLInputElement
    const buttonElement = screen.getByRole("search-button")
    fireEvent.change(inputElement, {target: {value: "India"}})
    fireEvent.click(buttonElement)
    expect(inputElement.value).toBe("");
  });

});

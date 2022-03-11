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

  test("input field for country exists", () => {
    render(<InputForm navigate={undefined} />);
    expect(screen.getByRole("input-field-country")).toBeInTheDocument();
  });

  test("search-button exists", () => {
    render(<InputForm navigate={undefined} />);
    expect(screen.getByRole("search-button")).toBeInTheDocument();
  });

  test("search-button is disabled initially", () => {
    render(<InputForm navigate={undefined} />);
    expect(screen.getByRole("search-button")).toBeDisabled();
  });

});

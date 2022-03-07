import React from "react";
import renderer from "react-test-renderer";
import InputForm from "../pages/InputForm";

test("input form page renders correctly", () => {
  const component = renderer.create(<InputForm navigate={undefined} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

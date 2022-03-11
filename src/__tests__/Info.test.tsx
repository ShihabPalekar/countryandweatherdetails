import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import Info from "../pages/Info";

test("info page renders correctly", () => {
  const component = renderer.create(
    <Info navigate={undefined} searchParams={undefined} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

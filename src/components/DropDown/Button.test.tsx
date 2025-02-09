import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import React from "react";

test("renders Button with correct label", () => {
  render(<Button label="Test Button" />);
  expect(screen.getByText("Test Button")).toBeInTheDocument();
});
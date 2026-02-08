import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders bathroom materials header", () => {
  render(<App />);
  expect(screen.getByText(/bathroom materials/i)).toBeInTheDocument();
});

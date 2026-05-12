import { render, screen } from "@testing-library/react";
import App from "./App";

test("redireciona da raiz para a tela de login", () => {
  render(<App />);
  const titulo = screen.getByText(/Eventify/i);
  expect(titulo).toBeInTheDocument();
});

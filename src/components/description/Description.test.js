import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Description from "./Description";

const propsMock = {
  name: "Mew",
  text: "test test test",
  type: "Classic",
  favList: ["Onix", "Pikachu"],
  addFav: () => {},
};

describe("Description", () => {
  test("renders Description component", () => {
    render(<Description {...propsMock} />);
    const buttonAddToFav = screen.getAllByRole("button")[1];
    fireEvent.click(buttonAddToFav);
    const buttonClose = screen.getAllByRole("button")[0];
    fireEvent.click(buttonClose);
  });
});

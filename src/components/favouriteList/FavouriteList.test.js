import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import FavouriteList from "./FavouriteList";

const propsMock = {
  list: ["Onix", "Pikachu"],
  removeFromFavList: () => {},
};

describe("FavouriteList", () => {
  test("renders FavouriteList component", () => {
    const rendered = render(<FavouriteList {...propsMock} />);
    const showFavList = screen.getAllByRole("button")[0];
    fireEvent.click(showFavList);
    expect(rendered.container.querySelector(".remove-fav-list")).not.toBeNull();
    const removeFromFavList = screen.getAllByRole("button")[1];
    fireEvent.click(removeFromFavList);
  });
});

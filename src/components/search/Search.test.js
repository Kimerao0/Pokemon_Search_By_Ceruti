import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Search from "./Search";

describe("Search", () => {
  test("renders Search component", () => {
    const rendered = render(<Search />);
    const searchInput = screen.getAllByRole("textbox")[0];
    const searchButton = screen.getAllByRole("button")[0];
    fireEvent.change(searchInput, {
      target: { value: "Pi" },
    });
    fireEvent.blur(searchInput);
    expect(rendered.container.querySelector(".error-input")).not.toBeNull();
    fireEvent.change(searchInput, {
      target: { value: "Pi$achu" },
    });
    fireEvent.blur(searchInput);
    expect(rendered.container.querySelector(".error-input")).not.toBeNull();
    fireEvent.change(searchInput, {
      target: { value: "Pikachu" },
    });
    fireEvent.click(searchButton);
    expect(rendered.container.querySelector(".error-input")).toBeNull();
  });
});

function saveToStorage(value) {
  window.localStorage.setItem("favlist", value);
}

const fakeLocalStorage = (function () {
  let favlist = { favlist: ["Pikachu", "Snorlax"] };

  return {
    getItem: function (key) {
      return favlist[key] || null;
    },
    setItem: function (key, value) {
      favlist[key] = value.toString();
    },
    removeItem: function (key) {
      delete favlist[key];
    },
    clear: function () {
      favlist = {};
    },
  };
})();

describe("localstorage favlist test", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage,
    });
  });

  it("useEffect with localstorage", () => {
    saveToStorage(["Pikachu", "Snorlax"]);
    render(<Search />);
    const showFavListButton = screen.getAllByRole("button")[1];
    fireEvent.click(showFavListButton);
    const eliminateFirstPokemonFromFavList = screen.getAllByRole("button")[2];
    fireEvent.click(eliminateFirstPokemonFromFavList);
  });
});

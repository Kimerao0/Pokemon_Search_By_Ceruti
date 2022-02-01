import { useState, useEffect } from "react";

import useInput from "../../hooks/useInput";
import Input from "../input/Input";
import useFetchPokemonDescription from "../../hooks/useFetchPokemonDescription";
import Loader from "../loader/Loader";
import Description from "../description/Description";
import FavouriteList from "../favouriteList/FavouriteList";

import "./Search.scss";

const Search = () => {
  const [favouriteList, setFavouriteList] = useState([]);
  const searchValue = useInput([
    {
      validation: (value) => value.match(/^[a-zA-Z0-9.-\s]*$/),
      message: "Only letters, numbers, spaces and '-' are allowed",
    },
    {
      validation: (value) => value.trim().length > 2,
      message: "The name is too short",
    },
  ]);
  const fetchData = useFetchPokemonDescription(searchValue.value);
  let description;
  let descriptionType;
  if (fetchData.pokemonDescription) {
    description = fetchData.pokemonShakespeareanDescription
      ? fetchData.pokemonShakespeareanDescription
      : fetchData.pokemonDescription;
    descriptionType = fetchData.pokemonShakespeareanDescription
      ? "Shakespearean"
      : "Classic";
  }

  useEffect(() => {
    let favlistString = localStorage.getItem("favlist");
    if (favlistString && favlistString.length > 0) {
      let favlistArray = favlistString.split(",");
      setFavouriteList(favlistArray);
    }
  }, []);

  const resetAll = () => {
    searchValue.reset();
    fetchData.reset();
  };

  const addPokémonToFavouriteList = () => {
    const list = [...favouriteList];
    list.push(fetchData.searchedPokemon);
    list.sort();
    localStorage.removeItem("favlist");
    localStorage.setItem("favlist", list);
    setFavouriteList(list);
  };

  const removePokémoneFromFavouriteList = (name) => {
    const listWithoutRemoved = favouriteList.filter((el) => el !== name);
    setFavouriteList(listWithoutRemoved);
    localStorage.setItem("favlist", listWithoutRemoved);
  };

  return (
    <>
      <h1>Pokémon Search</h1>
      <p className="sub-title">
        Search for a pokémon shakespearean description!
      </p>
      <Input
        type={"text"}
        placeholder={"Type a Pokèmon name..."}
        value={searchValue.value}
        onChangeHandler={searchValue.valueChangeHandler}
        onBlurHandler={searchValue.valueBlurHandler}
        isInValid={searchValue.hasError}
        reset={searchValue.reset}
        errorMessage={searchValue.errorMessage}
      />
      <button
        disabled={!searchValue.isValid}
        className="search-button"
        onClick={fetchData.fetchPokemonDescription}
      >
        Search!
      </button>
      {fetchData.isLoading === true && <Loader />}
      {!fetchData.isLoading && description && (
        <Description
          text={description}
          name={fetchData.searchedPokemon}
          close={resetAll}
          addFav={addPokémonToFavouriteList}
          favList={favouriteList}
          type={descriptionType}
        />
      )}
      {favouriteList.length > 0 && (
        <FavouriteList
          list={favouriteList}
          removeFromFavList={removePokémoneFromFavouriteList}
        />
      )}
    </>
  );
};

export default Search;

import { useState, useContext } from "react";

import NotificationContext from "../store/Notification-Context";

const useFetchPokemonDescription = (pokemonName) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [pokemonDescription, setPokemonDescription] = useState("");
  const [pokemonShakespeareanDescription, setPokemonShakespeareanDescription] =
    useState("");
  const notificationCtx = useContext(NotificationContext);

  const fetchPokemonDescription = async () => {
    setIsLoading(true);
    setPokemonDescription("");
    setPokemonShakespeareanDescription("");

    //Remove spaces at the beginning and end of the last word. There are pokemon with spaces in between words like "Mr. Mime", so we can't use trim(). ("Mr. Mime " ===> "Mr. Mime")
    const pokemonNoSpacesAtTheEnd = pokemonName.replace(/^\s+|\s+$/g, "");
    setSearchedPokemon(pokemonNoSpacesAtTheEnd);
    //Replace spaces in between words with the symbol "-" which is accepted by the api ("Mr. Mime" ===> "Mr.-Mime").
    const pokemonNameNoSpacesInBetween = pokemonNoSpacesAtTheEnd.replace(
      " ",
      "-"
    );
    //Remove any symbol "." from the string and transform the string to lowercase which is accepted by the api ("Mr.-Mime" ===> "mr-mime").
    const pokemonNameToFetch = pokemonNameNoSpacesInBetween
      .replace(".", "")
      .toLowerCase();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonNameToFetch}/`
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const pokemonData = await response.json();
      const descriptionInEng = pokemonData.flavor_text_entries.filter(
        (el) => el.language.name === "en"
      );
      //Take the latest description.
      const lastElement = descriptionInEng.length - 1;
      setPokemonDescription(descriptionInEng[lastElement].flavor_text);
      try {
        const responseShakespear = await fetch(
          `https://api.funtranslations.com/translate/shakespeare.json?text=${descriptionInEng[lastElement].flavor_text}`
        );
        const shakespeareanDescription = await responseShakespear.json();
        if (shakespeareanDescription && shakespeareanDescription.contents) {
          setPokemonShakespeareanDescription(
            shakespeareanDescription.contents.translated
          );
        }
        if (responseShakespear.status === 429) {
          notificationCtx.clearNotification();
          notificationCtx.addNotification(
            "Error! The Shakespear funtranslation Api has reached its request limit!"
          );
        }
        if (!response.ok) {
          throw new Error("Request failed!");
        }
      } catch (err) {
        notificationCtx.clearNotification();
        notificationCtx.addNotification(
          "Error! We could not retrieve the shakespearean translation!"
        );
      }
    } catch (err) {
      notificationCtx.clearNotification();
      notificationCtx.addNotification(
        `Error! We could not catch the Pokémon you were looking for (${searchedPokemon})!`
      );
    }
    setIsLoading(false);
  };
  const reset = () => {
    setIsLoading(false);
    setPokemonDescription("");
    setPokemonShakespeareanDescription("");
    setSearchedPokemon("");
  };
  return {
    isLoading,
    pokemonDescription,
    pokemonShakespeareanDescription,
    searchedPokemon,
    fetchPokemonDescription,
    reset,
  };
};

export default useFetchPokemonDescription;

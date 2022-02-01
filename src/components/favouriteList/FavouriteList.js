import { useState } from "react";

import "./FavouriteList.scss";

const FavouriteList = (props) => {
  const [showList, setShowList] = useState(false);

  const showListHandler = () => {
    setShowList((prev) => !prev);
  };
  const removeFromFavListHandler = (name) => {
    props.removeFromFavList(name);
  };

  const favList =
    props.list &&
    props.list.map((el) => (
      <li key={el}>
        <p>{el}</p>
        <button
          className="remove-fav-list"
          onClick={() => removeFromFavListHandler(el)}
        >
          Remove
        </button>
      </li>
    ));

  return (
    <div className="favourite-list-container">
      <button onClick={showListHandler}>
        {showList ? "Hide" : "Show"} Favourite List
      </button>
      {showList && <ul>{favList}</ul>}
    </div>
  );
};

export default FavouriteList;

import { useContext } from "react";

import NotificationContext from "../../store/Notification-Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./Description.scss";

const Description = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const addToFavouriteHandler = () => {
    props.addFav();
    notificationCtx.clearNotification();
    notificationCtx.addNotification(
      "Success! Pokémon added to the favourite list!"
    );
  };

  const pkmCannotBeAddedToFav =
    props.favList && props.favList.find((el) => el === props.name);

  return (
    <div className="description-container">
      <button className="close" onClick={props.close}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      <h3>{props.name}:</h3>
      <h4>({props.type})</h4>
      <p>{props.text}</p>
      <button
        disabled={pkmCannotBeAddedToFav}
        className="favourite"
        onClick={addToFavouriteHandler}
      >
        Add to favourite list
      </button>
    </div>
  );
};

export default Description;

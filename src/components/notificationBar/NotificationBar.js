import ReactDOM from "react-dom";
import { useEffect, useContext } from "react";

import NotificationContext from "../../store/Notification-Context";

import "./Notification.scss";

const NotificationsBar = (props) => {
  const notificationCtx = useContext(NotificationContext);
  useEffect(() => {
    const clearNotification = () => {
      notificationCtx.clearNotification();
    };
    setTimeout(clearNotification, 7000);
  }, [notificationCtx]);
  const color = props.message.charAt(0) === "S" ? " green" : "";
  const notificationBar = (
    <div className={"notificationBar" + color}>
      <p>{props.message}</p>
    </div>
  );

  return (
    <>
      {ReactDOM.createPortal(
        notificationBar,
        document.getElementById("notification")
      )}
    </>
  );
};

export default NotificationsBar;

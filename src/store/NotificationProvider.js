import { useReducer } from "react";
import NotificationContext from "./Notification-Context";

const defaultNotificationState = {
  message: "",
};

const NotificationReducer = (state, action) => {
  if (action.type === "ADD_NOTIFICATION") {
    return {
      message: action.message,
    };
  }
  if (action.type === "CLEAR_NOTIFICATION") {
    return defaultNotificationState;
  }
  return defaultNotificationState;
};

const NotificationProvider = (props) => {
  const [notificationState, dispatchNotificationAction] = useReducer(
    NotificationReducer,
    defaultNotificationState
  );

  const addNotification = (message) => {
    dispatchNotificationAction({ type: "ADD_NOTIFICATION", message });
  };

  const clearNotification = (id) => {
    dispatchNotificationAction({ type: "CLEAR_NOTIFICATION", id: id });
  };

  const notificationContext = {
    message: notificationState.message,
    addNotification: addNotification,
    clearNotification: clearNotification,
  };

  return (
    <NotificationContext.Provider value={notificationContext}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

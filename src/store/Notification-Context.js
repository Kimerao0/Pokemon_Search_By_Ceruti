import React from "react";

const NotificationContext = React.createContext({
  message: "",
  addNotification: (message) => {},
  clearNotification: () => {},
});

export default NotificationContext;

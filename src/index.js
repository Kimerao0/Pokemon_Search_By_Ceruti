import ReactDOM from "react-dom";

import App from "./App";
import NotificationProvider from "./store/NotificationProvider";

import "./index.scss";

ReactDOM.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
  document.getElementById("root")
);

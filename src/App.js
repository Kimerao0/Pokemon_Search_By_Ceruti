import { useContext } from "react";

import Search from "./components/search/Search";
import NotificationsBar from "./components/notificationBar/NotificationBar";
import NotificationContext from "./store/Notification-Context";

const App = () => {
  const notificationCtx = useContext(NotificationContext);
  return (
    <>
      {notificationCtx &&
        notificationCtx.message &&
        notificationCtx.message.length > 0 && (
          <NotificationsBar message={notificationCtx.message} />
        )}
      <main className="main-container">
        <Search />
      </main>
    </>
  );
};

export default App;

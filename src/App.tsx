import "./App.css";
import { useEffect } from "react";
import Modal from "react-modal";
import MainPage from "./components/main-page/main-page";
import { NotificationProvider } from "./components/notifications/notification-context";
import { LandingShell } from "./components/loading-shell/loading-shell";

Modal.setAppElement("#root");

function App() {
  useEffect(() => {
    console.log(`inner height: ${window.innerHeight}`);
    console.log(`width: ${window.innerWidth}`);
  }, []);

  return (
    <NotificationProvider>
      <LandingShell>
        <MainPage />
      </LandingShell>
    </NotificationProvider>
  );
}

export default App;

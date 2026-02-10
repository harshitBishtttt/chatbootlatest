import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/login/login";
import Home from "./pages/home/home";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only enable idle timer AFTER login
    if (location.pathname === "/") return;

    let idleTime = 0;
    const IDLE_LIMIT = 15 * 60; // 15 minutes (seconds)

    const resetIdleTime = () => {
      idleTime = 0;
    };

    const timerIncrement = () => {
      idleTime++;
      if (idleTime >= IDLE_LIMIT) {
        logoutUser();
      }
    };

    const idleInterval = setInterval(timerIncrement, 1000);

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach(event =>
      window.addEventListener(event, resetIdleTime)
    );

    return () => {
      clearInterval(idleInterval);
      events.forEach(event =>
        window.removeEventListener(event, resetIdleTime)
      );
    };
  }, [location.pathname]);

  const logoutUser = () => {
    localStorage.clear(); // or clear only auth token
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

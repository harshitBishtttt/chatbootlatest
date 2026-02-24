import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import Login from "./pages/login/login";
import Home from "./pages/home/home";

// ── Protected Route Component ──
function ProtectedRoute({ element }) {
  const token = localStorage.getItem("authToken");
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  // If token exists, show the component
  return element;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize logoutUser to prevent infinite loops
  const logoutUser = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    // Only enable idle timer AFTER login (not on login page)
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
  }, [location.pathname, logoutUser]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
    </Routes>
  );
}

export default App;

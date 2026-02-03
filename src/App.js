import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.js";
import Home from "./pages/home/home.js";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
     
    </Routes>
  );
}

export default App;
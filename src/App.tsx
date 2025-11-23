import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Show navbar ONLY if user is logged in AND not on the home/login pages
  const hideNavbarOnRoutes = ["/", "/login"];
  const shouldShowNavbar = user && !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

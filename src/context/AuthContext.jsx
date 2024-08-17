import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  // console.log("testing")

  // Checks if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    // If it's not /login, or /register, then sent the user back to /login
    const publicPaths = ["/login", "/register"]
    if (!token && !publicPaths.includes(location.pathname)) navigate("/login");
    else {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, [navigate, location.pathname]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/login");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn, logout, username }),
    [isLoggedIn, setIsLoggedIn, logout, username]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

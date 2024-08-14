import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null)
  console.log("testing")

  // Checks if the user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!storedToken) navigate("/login");
    else {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setToken(storedToken)
    }
  }, [navigate, token]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    setToken(null)
    navigate("/login");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({ isLoggedIn, logout, username, token }),
    [isLoggedIn, logout, username, token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

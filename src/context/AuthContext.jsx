import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else setIsLoggedIn(true);
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn, logout }),
    [isLoggedIn, setIsLoggedIn, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

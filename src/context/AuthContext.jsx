import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const auth = Cookies.get("token") || null;

  useEffect(() => {
    if (auth) {
      const decoded = jwtDecode(auth);
      console.log(decoded);
      setUser({
        email: decoded.user.email,
        id: decoded.user._id,
      });
    }
  }, []);

  const logout = () => {
    Cookies.remove("token", "userId");
    setUser(null);
    navigate("/");
    window.location.reload(true);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

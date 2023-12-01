import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const auth = Cookies.get("token") || null;

  useEffect(() => {
    if (auth) {
      const decoded = jwtDecode(auth);
      console.log("decoded", decoded.user._id);
      setUser({
        email: decoded.user.email,
        id: decoded.user._id,
      });
    }
  }, [auth]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    setUser(null);
    navigate("/");
    window.location.reload(true);
  };

  return (
    <AuthContext.Provider value={{ setUser, user, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

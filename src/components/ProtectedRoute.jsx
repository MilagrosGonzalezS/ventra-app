import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);
  const token = { token: auth };
  console.log(token);
  return token.token ? <Outlet /> : <Navigate to="/iniciar-sesion" />;
};

export { ProtectedRoute };

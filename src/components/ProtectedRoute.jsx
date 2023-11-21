import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/iniciar-sesion" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export { ProtectedRoute };

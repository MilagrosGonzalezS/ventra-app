import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  token: PropTypes.bool,
  children: PropTypes.node,
};

export default ProtectedRoute;

import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext } from "react";

async function logout() {
  const { setUser } = useContext(AuthContext);
  Cookies.remove("token", "userId");
  setUser(null);
  window.location.reload(true);
}
export { logout };

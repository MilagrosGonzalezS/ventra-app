import Cookies from "js-cookie";

async function logout() {
  Cookies.remove("token", "userId");
  window.location.reload(true);
}
export { logout };

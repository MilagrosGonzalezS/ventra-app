async function logout() {
  localStorage.clear();
  window.location.reload(true);
}
export default logout;

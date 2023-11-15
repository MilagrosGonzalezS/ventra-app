async function logout() {
  localStorage.clear();
  window.location.reload(true);
}
export { logout };

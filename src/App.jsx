import "./App.css";
// import ReactDOM from "react-dom/client";
import { Routes, Route, Navigate } from "react-router-dom";
//** COMPONENTES PRINCIPALES **//
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Login/Register";
import CreateEvent from "./views/CreateEvent/CreateEvent";
import Help from "./views/Help/Help";
import MyAccount from "./views/MyAccount/MyAccount";
import EditProfile from "./views/MyAccount/EditProfile";
import MyEvents from "./views/MyAccount/MyEvents";
import EditMyEvent from "./views/MyAccount/EditMyEvent";
import Wishlist from "./views/Wishlist/Wishlist";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import userData from "./functions/userData";

function App() {
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const data = userData();
    data.then((data) => {
      console.log(data.token);
      if (data.token) {
        setTokenExists(true);
      }
    });

    // const token = localStorage.getItem("token");
    // if (token) {
    //   setTokenExists(true);
    // }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="registrarse" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="crear-evento" element={<CreateEvent />} />
        <Route path="/ayuda" element={<Help />} />
        <Route
          path="/mi-cuenta"
          element={
            tokenExists ? (
              <MyAccount />
            ) : (
              <Navigate to="/iniciar-sesion" replace />
            )
          }
        />
        <Route
          path="/mi-cuenta/:userId/editar-datos"
          element={<EditProfile />}
        />
        <Route path="/mis-eventos" element={<MyEvents />} />
        <Route path="/mis-eventos/:eventId/editar" element={<EditMyEvent />} />
        <Route
          path="/favoritos"
          element={
            tokenExists ? (
              <Wishlist />
            ) : (
              <Navigate to="/iniciar-sesion" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;

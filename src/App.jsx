import "./App.css";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
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
// import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./views/Wishlist/Wishlist";
import BuyTicket from "./views/BuyTicket";
import NavNext from "./components/NavNext";

function App() {
  return (
    <>
      <NavNext></NavNext>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/ayuda" element={<Help />} />
        <Route
          path="/favoritos"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mi-cuenta"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mi-cuenta/:userId/editar-datos"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-eventos"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-eventos/:eventId/editar"
          element={
            <ProtectedRoute>
              <EditMyEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comprar/:eventId"
          element={
            <ProtectedRoute>
              <BuyTicket />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

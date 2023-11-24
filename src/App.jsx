import "./App.css";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
//** COMPONENTES PRINCIPALES **//
import {
  Home,
  Login,
  Register,
  CreateEvent,
  Help,
  MyAccount,
  EditProfile,
  MyEvents,
  EditMyEvent,
  Wishlist,
  BuyTicket,
  Checkout,
  MyTickets,
  EventDetails,
} from "./index.js";
import { ProtectedRoute, NavBar } from "./index.js";

function App() {
  return (
    <>
      <NavBar></NavBar>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/detalle/:eventId" element={<EventDetails />} />
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
          path="/detalle/comprar/:eventId"
          element={
            <ProtectedRoute>
              <BuyTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detalle/comprar/:eventId/checkout/:amount"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-entradas"
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

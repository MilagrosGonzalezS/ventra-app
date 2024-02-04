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
  // MyEvents,
  EditMyEvent,
  // Wishlist,
  BuyTicket,
  Checkout,
  // MyTickets,
  EventDetails,
  PaymentForm,
  ProtectedRoute,
  NavBar,
  Footer,
} from "./index.js";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        {/* vistas protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/favoritos" element={<Wishlist />} /> */}
          <Route path="/mi-cuenta" element={<MyAccount />} />
          <Route
            path="/mi-cuenta/:userId/editar-datos"
            element={<EditProfile />}
          />
          {/* <Route path="/mis-eventos" element={<MyEvents />} /> */}
          <Route
            path="/mis-eventos/:eventId/editar"
            element={<EditMyEvent />}
          />
          <Route path="/detalle/comprar/:eventId" element={<BuyTicket />} />
          <Route
            path="/detalle/comprar/:eventId/checkout/:amount"
            element={<Checkout />}
          />
          <Route
            path="/detalle/comprar/pago/:name/:eventId/:amount"
            element={<PaymentForm />}
          />
          {/* <Route path="/mis-entradas" element={<MyTickets />} /> */}
        </Route>
        {/* vistas no protegidas */}
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/detalle/:eventId" element={<EventDetails />} />
        <Route path="/ayuda" element={<Help />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;

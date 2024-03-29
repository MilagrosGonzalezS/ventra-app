import "./App.css";
import { Routes, Route } from "react-router-dom";
//** COMPONENTES PRINCIPALES **//
import {
  Home,
  GeneralLogin,
  Login,
  Register,
  CreateEvent,
  CreatorData,
  Help,
  MyAccount,
  EditProfile,
  EditMyEvent,
  BuyTicket,
  Checkout,
  EventDetails,
  PaymentSuccess,
  ProtectedRoute,
  NavBar,
  Footer,
  DashboardMyEvents,
  ResellList,
  ResellCheckout,
  ResellPaymentSuccess,
} from "./index.js";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        {/* vistas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mi-cuenta" element={<MyAccount />} />
          <Route
            path="/mi-cuenta/:userId/editar-datos"
            element={<EditProfile />}
          />
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
            path="/reventa/comprar/:eventId/checkout/:amount/:price/:ticketId/:resellId"
            element={<ResellCheckout />}
          />
          <Route
            path="/detalle/comprar/pago/:name/:eventId/:amount/:timestamp"
            element={<PaymentSuccess />}
          />
          <Route
            path="/reventa/comprar/:name/:eventId/:ticketId/:resellId/:timestamp"
            element={<ResellPaymentSuccess />}
          />
          <Route
            path="/mi-cuenta/panel-administrador"
            element={<DashboardMyEvents />}
          />
          <Route path="/reventa/:eventId" element={<ResellList />} />
          <Route path="/mi-cuenta/datos-creador" element={<CreatorData />} />
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

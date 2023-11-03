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
import Wishlist from "./views/Wishlist/Wishlist";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="registrarse" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="crear-evento" element={<CreateEvent />} />
        <Route path="/mi-cuenta" element={<Help />} />
        <Route path="/favoritos" element={<MyAccount />} />
        <Route path="/ayuda" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;

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
import MyEvents from "./views/MyAccount/MyEvents";
import Wishlist from "./views/Wishlist/Wishlist";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import Search from "./components/Search";
=======
>>>>>>> 109995e16ce8c7910f4de5dbca95c9ca5eb01a0f

function App() {
  return (
    <>
<<<<<<< HEAD
    <Navbar></Navbar>
    <Search></Search>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crear-evento" element={<CreateEvent />} />
=======
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="registrarse" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="crear-evento" element={<CreateEvent />} />
        <Route path="/ayuda" element={<Help />} />
        <Route path="/mi-cuenta" element={<MyAccount />} />
        <Route path="/mis-eventos" element={<MyEvents />} />
        <Route path="/favoritos" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;

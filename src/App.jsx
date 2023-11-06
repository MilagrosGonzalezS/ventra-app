import "./App.css";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
//** COMPONENTES PRINCIPALES **//
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import CreateEvent from "./views/CreateEvent/CreateEvent";
import Help from "./views/Help/Help";
import MyAccount from "./views/MyAccount/MyAccount";
import Wishlist from "./views/Wishlist/Wishlist";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Search></Search>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/mi-cuenta" element={<Help />} />
        <Route path="/favoritos" element={<MyAccount />} />
        <Route path="/ayuda" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;

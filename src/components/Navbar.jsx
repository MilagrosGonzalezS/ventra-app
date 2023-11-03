// import React from '
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo-blanco.png";

const Navbar = () => {
  return (
    <>
      <nav className="bg-[#181818] py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-32">
            <img className="w-full" src={logo} alt="Logo Ventra" />
          </div>
          <ul className="md:flex space-x-6">
            <li>
              <Link to="/" className="mx-auto text-light hover:text-lightblue">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/iniciar-sesion"
                className="mx-auto text-light hover:text-lightblue"
              >
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link
                to="/registrarse"
                className="mx-auto text-light hover:text-lightblue"
              >
                Registrarme
              </Link>
            </li>
            <li>
              <Link
                to="/ayuda"
                className="mx-auto text-light hover:text-lightblue"
              >
                Ayuda
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

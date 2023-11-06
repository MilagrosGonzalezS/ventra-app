//import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import VentraLogo from "../assets/imgs/logo-blanco.png";
import logout from "../functions/logout";

const Navbar = () => {
  const navigation = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigation("/");
  };

  return (
    <header>
      <div className="relative z-20 shadow bg-dark">
        <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="relative z-20">
              <Link to="/">
                <img src={VentraLogo} alt="logo-tailus" className="w-32" />
              </Link>
            </div>
            <div className="flex items-center justify-end">
              <input
                type="checkbox"
                name="hamburger"
                id="hamburger"
                className="peer"
                hidden
              />
              <label
                htmlFor="hamburger"
                className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden"
              >
                <div
                  aria-hidden="true"
                  className="m-auto h-0.5 w-6 rounded bg-light transition duration-300"
                ></div>
                <div
                  aria-hidden="true"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-light transition duration-300"
                ></div>
              </label>
              <div className="peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] bg-dark  shadow-xl transition duration-300 lg:w-auto lg:static lg:shadow-none lg:translate-x-0">
                <div className="flex flex-col h-full justify-between lg:items-center lg:flex-row">
                  <ul className="px-6 pt-32 space-y-8 md:px-12 lg:space-y-0 lg:flex lg:space-x-12 lg:pt-0">
                    <li>
                      <Link
                        to="/"
                        className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-right before:scale-x-0 before:bg-green before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100"
                      >
                        <span className="relative text-light font-accent">
                          Inicio
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/crear-evento"
                        className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-right before:scale-x-0 before:bg-green before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100"
                      >
                        <span className="relative text-light font-accent">
                          Crear Evento
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ayuda"
                        className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-right before:scale-x-0 before:bg-green before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100"
                      >
                        <span className="relative text-light font-accent">
                          Ayuda
                        </span>
                      </Link>
                    </li>
                    {tokenExists && (
                      <li>
                        <Link
                          to="/favoritos"
                          className="group relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:origin-right before:scale-x-0 before:bg-green before:transition before:duration-200 hover:before:origin-left hover:before:scale-x-100"
                        >
                          <span className="relative text-light font-accent">
                            Favoritos
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                  {tokenExists && (
                    <>
                      <div className="py-8 px-6 md:px-12 md:py-16 lg:py-0 lg:pr-0 lg:pl-6">
                        <Link
                          to="/mi-cuenta"
                          className="block px-6 py-2 rounded-lg bg-green text-center text-dark"
                        >
                          Mi Cuenta
                          <FontAwesomeIcon icon={faUser} className="ms-2" />
                        </Link>
                      </div>
                      <button
                        onClick={() => handleLogout()}
                        className="block px-6 py-2 rounded-lg bg-pink text-center text-dark ms-2"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </button>
                    </>
                  )}
                  {!tokenExists && (
                    <>
                      <div className="py-8 px-6 md:px-12 md:py-16 lg:py-0 lg:pr-0 lg:pl-6">
                        <Link
                          to="/iniciar-sesion"
                          className="block px-6 py-2 rounded-lg bg-green text-center text-dark"
                        >
                          Iniciar Sesión
                          <FontAwesomeIcon
                            icon={faFaceSmile}
                            className="ms-2"
                          />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

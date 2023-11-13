import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VentraLogo from "../assets/imgs/logo-blanco.png";
import logout from "../functions/logout";

function NavNext() {
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
    <>
      <div className="drawer fixed top-0 w-full">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-center">
          {/* Navbar */}
          <div className="w-full navbar navBlur">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <img src={VentraLogo} alt="logo de ventra" className="w-28" />
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal flex items-center">
                {/* Navbar menu content here */}
                <li className="me-6">
                  <Link to="/">
                    <span className="relative text-light font-accent">
                      Inicio
                    </span>
                  </Link>
                </li>
                <li className="me-6">
                  <Link to="/crear-evento">
                    <span className="relative text-light font-accent">
                      Crear Evento
                    </span>
                  </Link>
                </li>
                <li className="me-6">
                  <Link to="/ayuda">
                    <span className="relative text-light font-accent">
                      Ayuda
                    </span>
                  </Link>
                </li>
                {tokenExists ? (
                  <li className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="https://i.pinimg.com/1200x/9f/dd/8f/9fdd8ff262a58cfc71f660792a974c44.jpg"
                        />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-dark rounded-box w-52"
                    >
                      <li className="mb-2">
                        <Link
                          to="/mi-cuenta"
                          className="hover:bg-green hover:text-dark"
                        >
                          Mi cuenta
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          to="/mis-eventos"
                          className="hover:bg-green hover:text-dark"
                        >
                          Mis eventos
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          to="/mis-entradas"
                          className="hover:bg-green hover:text-dark"
                        >
                          Mis entradas
                        </Link>
                      </li>
                      <li className="mb-2">
                        <button
                          className="hover:bg-pink hover:text-dark"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <div>
                    <Link
                      to="/iniciar-sesion"
                      className="px-6 py-2 rounded-lg bg-lightblue text-center text-dark text-sm hover:bg-lightblue"
                    >
                      Iniciar Sesión
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-dark">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavNext;

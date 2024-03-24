import { useState } from "react";
import iconVentra from "../../assets/imgs/logo-icon.png";
import colors from "../../assets/imgs/recurso-colores.png";
import video from "../../assets/videos/video-login.mp4";
import { Login, Register } from "../../index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

function GeneralLogin() {
  const [selectedView, setSelectedView] = useState("login");

  const handleView = (view) => {
    if (view == "login") {
      setSelectedView(view);
    } else if (view == "register") {
      setSelectedView(view);
    }
  };

  return (
    <>
      <main className="min-h-screen grid grid-cols-12 bg-pattern gap-10">
        <div className="relative col-span-6">
          <video
            autoPlay
            playsInline
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col justify-between p-10 bg-[#0000005c]">
            <a
              href="/"
              className="flex hover:translate-y-[-4px] hover:shadow-md transition-transform duration-400"
            >
              <FontAwesomeIcon
                icon={faCircleChevronLeft}
                className="text-2xl me-2 font-light"
              />
              Volver
            </a>
            <div>
              <p className="font-light text-base">Fácil, rápido y seguro</p>
              <h1 className="text-4xl font-semibold">BIENVENIDO A VENTRA</h1>
              <p className="font-light text-lg">
                Únete a nosotros para descubrir eventos emocionantes.
              </p>
            </div>
            <img
              className="w-20 mt-4"
              src={colors}
              alt="recurso gráfico de colores"
            />
          </div>
        </div>

        <div className="col-span-6 flex flex-col justify-center gap-4 items-center  mt-25">
          <img className="w-[100px]" src={iconVentra} alt="Ventra Icono" />
          <div className="rounded-full bg-dark p-1 mt-4">
            <button
              onClick={() => handleView("login")}
              className={`  rounded-2xl py-2 px-6 text-sm text-light ${
                selectedView == "login" ? "bg-graydarker" : ""
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => handleView("register")}
              className={` rounded-2xl py-2 px-6 text-sm text-light ${
                selectedView == "register" ? "bg-graydarker" : ""
              }`}
            >
              Registrarse
            </button>
          </div>
          <div className="col-span-12">
            {selectedView == "login" && <Login />}
            {selectedView == "register" && <Register />}
          </div>
        </div>
      </main>
    </>
  );
}

export { GeneralLogin };

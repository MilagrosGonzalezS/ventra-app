import { useState } from "react";
import { Login, Register } from "../../index.js";

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
        <div className="bg-lightblue col-span-6"></div>
        <div className="col-span-6 flex flex-col justify-center gap-4 items-center  mt-25">
          <div className="rounded-full bg-dark p-1">
            <button
              onClick={() => handleView("login")}
              className={` rounded-2xl py-2 px-6 text-sm text-light ${
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

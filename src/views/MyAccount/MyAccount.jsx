import { useState, useEffect } from "react";
import { MyEvents, Wishlist, MyTickets, userData } from "../../index.js";
// import { PuffLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import profilepic from "../../assets/imgs/profilepic.png";

function MyAccount() {
  const navigation = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("eventos");
  useEffect(() => {
    setIsLoading(true);
    const data = userData();
    data.then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  const handleView = (view) => {
    console.log(view);
    if (view == "eventos") {
      setSelectedView(view);
    } else if (view == "privados") {
      setSelectedView(view);
    } else if (view == "favoritos") {
      setSelectedView(view);
    } else if (view == "tickets") {
      setSelectedView(view);
    }
  };

  return (
    <main className="bg-myaccount md:px-20 px-10 grid grid-cols-12 gap-10">
      <aside className="h-fit bg-dark rounded-3xl py-6 px-12 col-span-4 mt-60 flex flex-col justify-evenly items-center mb-20">
        <img className="my-2 w-2/4" src={profilepic} alt="foto de perfil"></img>
        <p className="my-2 font-accent text-lg">{user.username}</p>
        <Button
          className="my-2 w-full bg-lightblue text-dark font-medium"
          type="submit"
          onPress={() => {
            navigation(`/mi-cuenta/${user.id}/editar-datos`);
          }}
        >
          Editar perfil
        </Button>
        <Button className="my-2 w-full" color="default" variant="faded">
          Herramienta de gestión
        </Button>
        <hr className="my-4 bg-light w-full"></hr>
        <div className="my-4 flex justify-between w-full">
          <ul>
            <li className="mt-2 text-sm">Eventos publicados</li>
            <li className="mt-2 text-sm">Eventos privados</li>
            <li className="mt-2 text-sm">Eventos favoritos</li>
            <li className="mt-2 text-sm">Tickets comprados</li>
          </ul>
          <ul>
            <li className="mt-2 text-sm">6</li>
            <li className="mt-2 text-sm">2</li>
            <li className="mt-2 text-sm">4</li>
            <li className="mt-2 text-sm">2</li>
          </ul>
        </div>
        <Button className="mt-10 w-full" color="danger">
          Cerrar sesión
        </Button>
      </aside>
      <section className="col-span-8 mt-[55vh]">
        <div className="w-full flex justify-start gap-4 items-center">
          {/* <button
            onClick={() => handleView("eventos")}
            className="bg-dark rounded-2xl py-2 px-6 text-sm text-light hover:border"
          >
            Mis eventos
          </button>
          <button
            onClick={() => handleView("privados")}
            className="bg-dark rounded-2xl py-2 px-6 text-sm text-light hover:border"
          >
            Eventos privados
          </button> */}
          <button
            onClick={() => handleView("favoritos")}
            className="bg-dark rounded-2xl py-2 px-6 text-sm text-light hover:border justify-self-end"
          >
            Favoritos
          </button>
          <button
            onClick={() => handleView("tickets")}
            className="bg-dark rounded-2xl py-2 px-6 text-sm text-light hover:border"
          >
            Mis tickets
          </button>
          <Link
            to="/crear-evento"
            className="bg-green rounded-2xl py-2 px-6 text-sm text-dark ml-8 font-medium"
          >
            Crear evento
          </Link>
        </div>
        <div>
          {selectedView == "eventos" && <MyEvents />}
          {selectedView == "favoritos" && <Wishlist />}
          {selectedView == "tickets" && <MyTickets />}
        </div>
      </section>
      {/* <div className=" h-[60vh]"></div> */}
      {/* <div className="text-center bg-opacity border p-6  rounded-xl w-[500px]">
        <h1 className="mb-3 font-accent font-medium text-3xl text-green">
          Mi cuenta
        </h1>
        <hr />
        {isLoading ? (
          <PuffLoader className="mt-10" color="#04b290" />
        ) : (
          <div className="text-start mt-4">
            <p className="mb-2 font-primary text-sm">
              <span className="me-2 font-accent text-base">Nombre:</span>
              {user.username}
            </p>
            <p className="mb-5 font-primary text-sm">
              <span className="me-2 font-accent text-base">Email:</span>
              {user.email}
            </p>
            <Button
              className="w-full bg-green text-dark font-medium"
              type="submit"
              onPress={() => {
                navigation(`/mi-cuenta/${user.id}/editar-datos`);
              }}
            >
              Editar Mis Datos
            </Button>
          </div>
        )}
      </div> */}
    </main>
  );
}

export { MyAccount };

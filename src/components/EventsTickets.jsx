import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { getMyEvents, getMySoldTickets, editMyEvent } from "../index.js";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
function EventsTickets() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  const changeStatus = (eventId, status) => {
    const newStatus = !status; // Cambiar el estado actual a su valor opuesto
    editMyEvent({ status: newStatus }, eventId)
      .then(() => {
        setStatus(newStatus);
        toast.success(
          `La evento ha cambiado a ${newStatus ? "Publicado" : "No Publicado"}`
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error al cambiar el estado:", error);
        // Manejar el error adecuadamente, mostrar un mensaje al usuario, etc.
      });
  };

  useEffect(() => {
    const userId = Cookies.get("userId");
    getMyEvents(userId)
      .then(async (eventsData) => {
        const eventsWithTickets = await Promise.all(
          eventsData.data.map(async (event) => {
            const soldTickets = await getMySoldTickets(event._id);
            return { ...event, soldTickets };
          })
        );
        setEvents(eventsWithTickets);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className="flex flex-col items-start mt-8">
        {isLoading ? (
          <PuffLoader color="#04b290" />
        ) : (
          <div className="container mx-auto px-4 sm:px-8">
            <div className="pb-8 mt-28">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  Eventos
                </h2>
              </div>

              <div className="-mx-4 sm:-mx-8 px-4 sm:px-4 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-graylighter bg-dark text-left text-xs font-semibold text-light uppercase tracking-wider">
                          Evento
                        </th>
                        <th className="px-10 py-3 border-b-2 border-graylighter bg-dark text-left text-xs font-semibold text-light uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-5 py-3 border-b-2 border-graylighter bg-dark text-left text-xs font-semibold text-light uppercase tracking-wider">
                          Lugar
                        </th>
                        <th className="px-5 py-3 border-b-2 border-graylighter bg-dark text-left text-xs font-semibold text-light uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-5 py-3 border-b-2 border-graylighter bg-dark text-left text-xs font-semibold text-light uppercase tracking-wider">
                          Entradas Restantes
                        </th>
                        <th className="px-5 py-3 border-b-2 border-graylighter bg-dark text-left text-xs font-semibold text-light uppercase tracking-wider">
                          Entradas Vendidas
                        </th>
                        <th className="px-5 py-3 border-b-2 border-graylighter bg-dark text-left text-xs font-semibold text-light uppercase tracking-wider">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event._id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker text-sm">
                            <div className="flex">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={`http://localhost/ventra-API/${event.cover}`}
                                  alt={event.name}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-light whitespace-no-wrap">
                                  {event.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker  text-xs">
                            <p className="text-light whitespace-no-wrap">
                              {formatDate(event.date)} <br /> {event.time}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker  text-sm">
                            <p className="text-light whitespace-no-wrap">
                              {event.venue}
                            </p>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker  text-sm">
                            <p className="text-light whitespace-normal truncate">
                              ${event.price}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker  text-sm">
                            <p className="text-light whitespace-normal truncate">
                              {event.ticketCount}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker  text-sm">
                            <p className="text-light whitespace-normal truncate">
                              {event.soldTickets}
                            </p>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker  text-sm text-right">
                            <Dropdown placement="bottom-end">
                              <DropdownTrigger className="bg-graylighter p-1 rounded-md">
                                <button
                                  type="button"
                                  className="inline-block text-light hover:text-gray-700"
                                >
                                  <svg
                                    className="inline-block h-6 w-6 fill-light border-gray-200"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                  </svg>
                                </button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                              >
                                <DropdownItem
                                  key="edit"
                                  onClick={() =>
                                    navigation(
                                      `/mis-eventos/${event._id}/editar`
                                    )
                                  }
                                >
                                  Editar
                                </DropdownItem>

                                <DropdownItem
                                  key="status"
                                  onClick={() =>
                                    changeStatus(event._id, event.status)
                                  }
                                >
                                  Cambiar publicación
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                            <Toaster position="center-center"></Toaster>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
export { EventsTickets };

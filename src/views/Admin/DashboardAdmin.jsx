import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllAdminEvents,
  editApprovement,
  editFeatured,
} from "../../index.js";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import colors from "../../assets/imgs/recurso-colores.png";
import { format } from "date-fns";

function DashboardAdmin() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  // Función cambiar estado de aprobación del evento
  const handleEditApprovement = async (eventId, approve) => {
    editApprovement(eventId, approve)
      .then((res) => {
        console.log(res);
        setEvents(
          events.map((event) => {
            if (event._id === eventId) {
              return {
                ...event,
                approve: approve,
              };
            }
            return event;
          })
        );
        toast.success("Estado de aprobación modificado");
      })
      .catch((error) => {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      });
  };

  // Función destacar evento en home
  const handleFeatured = async (eventId, featured) => {
    const newFeaturedState = !featured; // Cambiar el estado de featured
    console.log(eventId);
    editFeatured(eventId, newFeaturedState)
      .then((res) => {
        setEvents(
          events.map((event) => {
            if (event._id === eventId) {
              return {
                ...event,
                featured: newFeaturedState,
              };
            }
            return event;
          })
        );
        if (newFeaturedState) {
          toast.success("Evento agregado a destacados");
        } else {
          toast.success("Evento eliminado de destacados");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllAdminEvents();
        setEvents(response.data.events);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <section className="flex flex-col items-start mt-8">
        {isLoading ? (
          <PuffLoader color="#04b290" />
        ) : (
          <div className="container mx-auto px-4 sm:px-8">
            <Toaster
              position="center-center"
              toastOptions={{
                style: {
                  background: "#181818", // Color de fondo
                  color: "white", // Color del texto
                },
              }}
            ></Toaster>
            <div className="py-8">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">
                  Eventos
                </h2>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Evento
                        </th>
                        <th className="px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Lugar
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Descripción
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr
                          key={event.id}
                          className={` ${
                            event.featured === true
                              ? "bg-violet-300"
                              : "bg-white"
                          }`}
                        >
                          <td className="px-5 py-5 border-b border-gray-200 text-sm">
                            <div className="flex">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={`http://localhost/ventra-API/${event.cover}`}
                                  alt={event.name}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {event.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatDate(event.date)}
                            </p>
                            <p className="text-gray-600 whitespace-no-wrap">
                              {event.time}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {event.venue}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-normal truncate">
                              {event.description}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm">
                            {/* <p className="text-gray-900 whitespace-normal truncate">
                              {event.status === true
                                ? "Publicado"
                                : "No publicado"}
                            </p> */}
                            <div className="relative">
                              {event.approve === "pending" ? (
                                <p className="  pl-1 pr-4  py-1 rounded-md bg-gray-500 text-xs">
                                  Evento pendiente
                                  <span className="absolute  right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-yellow-500 rounded-full"></span>
                                </p>
                              ) : event.approve === "approve" ? (
                                <p className="   pl-1 pr-4  py-1 rounded-md bg-gray-500 text-xs">
                                  Evento aprobado
                                  <span className="absolute  right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-green rounded-full"></span>
                                </p>
                              ) : (
                                <p className="  pl-1 pr-4  py-1 rounded-md bg-gray-500 text-xs">
                                  Evento no aprobado
                                  <span className="absolute  right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-red-700 rounded-full"></span>
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm text-right">
                            <Dropdown placement="bottom-end">
                              <DropdownTrigger>
                                <button
                                  type="button"
                                  className="inline-block text-gray-500 hover:text-gray-700"
                                >
                                  <svg
                                    className="inline-block h-6 w-6 fill-graydarker"
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
                                  key="featured"
                                  onClick={() =>
                                    handleFeatured(event._id, event.featured)
                                  }
                                >
                                  {!event.featured ? "Destacar" : "No destacar"}
                                </DropdownItem>
                                <DropdownItem
                                  key="approve"
                                  onClick={() =>
                                    handleEditApprovement(event._id, "approve")
                                  }
                                >
                                  Aprobar
                                </DropdownItem>

                                <DropdownItem
                                  key="unapprove"
                                  onClick={() =>
                                    handleEditApprovement(
                                      event._id,
                                      "unapprove"
                                    )
                                  }
                                >
                                  No Aprobar
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
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
export { DashboardAdmin };

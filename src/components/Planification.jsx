import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyEvents, PlanificationEvent } from "../index.js";
import { Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { format } from "date-fns";

function Planification() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [showPlanificationEvent, setShowPlanificationEvent] = useState(false); // Estado para controlar si se muestra el componente PlanificationEvent
  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  // Función para manejar el clic en el botón "Planificar"
  const handlePlanificarClick = (eventId, eventName) => {
    setSelectedEventId(eventId);
    setSelectedEventName(eventName); // Actualiza el estado con el event._id seleccionado
    setShowPlanificationEvent(true); // Muestra el componente PlanificationEvent
  };

  useEffect(() => {
    const userId = Cookies.get("userId");
    getMyEvents(userId)
      .then((eventsData) => {
        setEvents(eventsData.data);
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
        ) : showPlanificationEvent ? (
          <PlanificationEvent
            eventId={selectedEventId}
            eventName={selectedEventName}
          />
        ) : (
          <div className="container mt-28 mx-auto px-4 sm:px-8">
            <div className="pb-8">
              <div>
                <h2 className="text-2xl bg-dark p-2 rounded-md font-semibold leading-tight">
                  Eligí el evento que deseás planificar.
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
                          Seleccionar
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

                          <td className="px-5 py-5 border-b border-gray-200 bg-graydarker  text-sm ">
                            <Button
                              onClick={() =>
                                handlePlanificarClick(event._id, event.name)
                              }
                            >
                              Planificar
                            </Button>
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
export { Planification };

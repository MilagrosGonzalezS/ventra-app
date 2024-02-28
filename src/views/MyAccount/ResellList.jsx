import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { Button } from "@nextui-org/react";
import { getResellList, getEventById } from "../../index.js";
import { format } from "date-fns";
import calendar from "../../assets/imgs/calendar-alt.png";
import clock from "../../assets/imgs/clock.png";
import mapMarker from "../../assets/imgs/map-marker-alt.png";
import colors from "../../assets/imgs/recurso-colores.png";
import profilepic from "../../assets/imgs/profilepic.png";

function ResellList() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState({});

  const { eventId } = useParams();

  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const resellList = await getResellList(eventId);
        setTickets(resellList.data);
        console.log(resellList.data);
        const eventRes = await getEventById(eventId);
        setEventData(eventRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <>
      {isLoading ? (
        <PuffLoader
          className="absolute left-1/2 -translate-x-1/2 top-10"
          color="#04b290"
        />
      ) : (
        <main className="bg-eventdetail min-h-screen px-20 grid grid-cols-12 gap-10">
          <div className="h-fit bg-dark rounded-3xl col-span-4 mt-40 xl:mt-80 flex flex-col justify-evenly items-center mb-20 text-center">
            {eventData && Array.isArray(eventData) && eventData.length > 0 && (
              <img
                className="pb-2 w-full rounded-3xl"
                src={`http://localhost/ventra-API/${eventData[0].cover}`}
                alt={eventData[0].description}
              />
            )}

            <p className="text-xs my-8 mx-4">
              Al valor indicado, se sumará el costo por servicio. En caso de
              reembolso, dicho costo no será reintegrado.
            </p>
          </div>
          <div className="mt-40 col-span-6">
            {eventData && Array.isArray(eventData) && eventData.length > 0 && (
              <div>
                <h1 className="text-4xl font-accent">{eventData[0].name}</h1>
                <div className="flex gap-12 mb-8 mt-12">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-6"
                      src={calendar}
                      alt="icono de calendario"
                    />
                    <p>
                      <div>{formatDate(eventData[0].date)}</div>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img className="w-6" src={clock} alt="icono de reloj" />
                    <p>{eventData[0].time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 ">
                  <img
                    className="w-6"
                    src={mapMarker}
                    alt="icono de marcador en el mapa"
                  />
                  <p>
                    {eventData[0].venue} - {eventData[0].address?.street}{" "}
                    {eventData[0].address?.number} - ({eventData[0].zone})
                  </p>
                </div>
              </div>
            )}
            <div className="mt-16">
              <h2 className="text-2xl mb-4">Entradas en reventa</h2>
              <div className="w-fit">
                <img
                  className="w-full"
                  src={colors}
                  alt="recurso gráfico de colores"
                />
              </div>
              <div className="flex flex-wrap gap-10">
                {tickets.length == 0 ? (
                  <p>No se han publicado tickets en reventa</p>
                ) : (
                  tickets.map((ticket) => (
                    <div
                      className="bg-dark rounded-2xl py-2 px-4 mt-8 h-fit w-full"
                      key={ticket._id}
                    >
                      {eventData &&
                        Array.isArray(eventData) &&
                        eventData.length > 0 && (
                          <>
                            <div className="flex gap-4 items-center">
                              <img
                                className="my-2 w-12"
                                src={profilepic}
                                alt="foto de perfil del usuario"
                              ></img>
                              <p>{ticket.username}</p>
                            </div>
                            <hr className="my-2"></hr>
                            <p className="mt-4">{eventData[0].name}</p>
                            <div className="flex items-center justify-between">
                              <p>${ticket.ticketPrice}</p>
                              <Link
                                to={`/reventa/comprar/${eventData[0]._id}/checkout/1/${ticket.ticketPrice}/${ticket.ticketId}/${ticket._id}`}
                                className="bg-gray-700 rounded-xl py-1 px-8 my-4 text-light font-medium text-sm"
                              >
                                Comprar
                              </Link>
                            </div>
                          </>
                        )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export { ResellList };

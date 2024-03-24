import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { getMyEvents } from "../../index.js";
import { Card, CardFooter, Image, Button, Tooltip } from "@nextui-org/react";
import Cookies from "js-cookie";
import colors from "../../assets/imgs/recurso-colores.png";
import { format } from "date-fns";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MyEvents({ user }) {
  const userId = Cookies.get("userId");
  console.log("userId", userId);
  const navigation = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  const handleNavigation = (eventId) => {
    window.location.href = `/detalle/${eventId}`;
  };

  const formatPrice = (price) => {
    if (!price) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getEvents = () => {
    setIsLoading(true);
    getMyEvents(userId)
      .then((eventsData) => {
        setEvents(eventsData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <section className="flex flex-col items-start mt-8">
        <div className="">
          <div className="flex items-center gap-4">
            <div className="w-16">
              <img
                className="w-full"
                src={colors}
                alt="recurso gráfico de colores"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-accent">Mis eventos</h2>
            {!user.completeData && (
              <Link to="/mi-cuenta/datos-creador">
                <p className="font-accent text-center dark:bg-gray-800 p-2 rounded-lg">
                  Tenés que{" "}
                  <span className="text-lightblue cursor-pointer">
                    completar tus datos
                  </span>{" "}
                  para poder publicar tus eventos.
                </p>
              </Link>
            )}
          </div>
          {isLoading ? (
            <PuffLoader
              className="absolute left-1/2 -translate-x-1/2 top-10"
              color="#04b290"
            />
          ) : (
            <div className="flex gap-4 justify-start flex-wrap mt-4">
              {events.length === 0 ? (
                <p className="font-accent text-center">
                  Aún no has creado ningún evento.
                </p>
              ) : (
                events.map((event) => (
                  <article key={event._id}>
                    <Card
                      isFooterBlurred
                      className="w-[273px] h-[350px] col-span-12 sm:col-span-3 transition-transform duration-400 hover:shadow-md hover:transform hover:-translate-y-1"
                    >
                      <div className="absolute z-10 top-0 flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="bg-[#141414] w-full py-2 px-3 mt-0 absolute top-0  flex items-center">
                            {event.approve === "pending" ? (
                              <div>
                                <Tooltip content="Evento en espera de aprobación">
                                  <p className="text-xs text-white">
                                    <span className=" text-yellow-500 me-2">
                                      ●
                                    </span>
                                    Evento pendiente
                                  </p>
                                </Tooltip>
                                <p className="absolute top-1 right-3">
                                  {event.status ? (
                                    <Tooltip content="Evento visible">
                                      <FontAwesomeIcon icon={faEye} />
                                    </Tooltip>
                                  ) : (
                                    <Tooltip content="Evento no visible">
                                      <FontAwesomeIcon icon={faEyeSlash} />
                                    </Tooltip>
                                  )}
                                </p>
                              </div>
                            ) : event.approve === "approve" ? (
                              <div>
                                <Tooltip content="¡Evento aprobado con exito!">
                                  <p className="text-xs text-white">
                                    <span className=" text-green me-2">●</span>
                                    Evento aprobado
                                  </p>
                                </Tooltip>
                                <p className="absolute top-1 right-3">
                                  {event.status ? (
                                    <Tooltip content="Evento visible">
                                      <FontAwesomeIcon icon={faEye} />
                                    </Tooltip>
                                  ) : (
                                    <Tooltip content="Evento no visible">
                                      <FontAwesomeIcon icon={faEyeSlash} />
                                    </Tooltip>
                                  )}
                                </p>
                              </div>
                            ) : (
                              <div>
                                <Tooltip content="¡El evento no esta aprobado!">
                                  <p className="text-xs text-white">
                                    <span className=" text-red-700 me-2">
                                      ●
                                    </span>
                                    Evento no aprobado
                                  </p>
                                </Tooltip>
                                <p className="absolute top-1 right-3">
                                  {event.status ? (
                                    <Tooltip content="Evento visible">
                                      <FontAwesomeIcon icon={faEye} />
                                    </Tooltip>
                                  ) : (
                                    <Tooltip content="Evento no visible">
                                      <FontAwesomeIcon icon={faEyeSlash} />
                                    </Tooltip>
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Image
                        onClick={() => handleNavigation(event._id)}
                        removeWrapper
                        alt={event.name}
                        className="z-0 w-full h-full object-cover cursor-pointer"
                        src={`http://localhost/ventra-API/${event.cover}`}
                      />
                      <CardFooter className="absolute h-[100px] bg-[#141414] bottom-0 z-10">
                        <div className="flex flex-grow gap-2 items-center">
                          <div className="flex flex-col">
                            <h4 className="text-white/90 font-normal text-xl truncate">
                              {event.name}
                            </h4>
                            <p className="font-light text-[#B3B3B3] text-xl">
                              ${formatPrice(event.price)}
                            </p>
                          </div>
                        </div>
                        <Tooltip content="Editar evento">
                          <Button
                            color="default"
                            onPress={() => {
                              navigation(`/mis-eventos/${event._id}/editar`);
                            }}
                            variant="flat"
                          >
                            <FontAwesomeIcon
                              icon={faCog}
                              style={{
                                transform: "rotate(-45deg)",
                                fontSize: "20px",
                              }}
                            />
                          </Button>
                        </Tooltip>
                      </CardFooter>
                    </Card>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export { MyEvents };

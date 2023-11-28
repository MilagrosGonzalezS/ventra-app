import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { deleteMyEvent, getMyEvents } from "../../index.js";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { AuthContext } from "../../context/AuthContext.jsx";

function MyEvents() {
  const { user } = useContext(AuthContext);
  const userId = user.id;
  const navigation = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <section className="min-h-screen flex-col items-center bg-pattern px-20 pt-12">
        <h1 className="font-accent text-3xl text-orange mb-8">Mis Eventos</h1>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex gap-16 justify-start flex-wrap mt-4">
            {events.length === 0 ? (
              <p className="font-accent text-center">
                Aún no has creado ningún evento.
              </p>
            ) : (
              events.map((event) => (
                <article key={event._id}>
                  <Card
                    isFooterBlurred
                    className="w-[350px] h-[450px] col-span-12 sm:col-span-7 transition-transform duration-400 hover:shadow-md hover:transform hover:-translate-y-1"
                  >
                    <Image
                      removeWrapper
                      alt={event.name}
                      className="z-0 w-full h-full object-cover"
                      src={`http://localhost/ventra-API/${event.cover}`}
                    />
                    <CardFooter className="absolute h-fit bg-black/40 bottom-0 z-10 border-t-1 border-default-600 white:border-default-100">
                      <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col gap-2">
                          <h4 className="text-white/90 font-medium text-xl">
                            {event.name}
                          </h4>
                          <p className="text-sm text-white/100">
                            {event.venue}
                          </p>
                          <p className="text-xs text-white/60">
                            {event.date ? event.date.slice(0, 10) : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <Button
                          className="bg-green text-dark py-2 px-4"
                          onPress={() => {
                            navigation(`/detalle/${event._id}`);
                          }}
                        >
                          Ver más
                        </Button>
                        <Button
                          className="bg-orange"
                          onPress={() => {
                            navigation(`/mis-eventos/${event._id}/editar`);
                          }}
                          variant="faded"
                        >
                          Administrar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </article>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
}

export { MyEvents };

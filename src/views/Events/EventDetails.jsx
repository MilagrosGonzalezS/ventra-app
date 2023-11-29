import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../../index.js";
import { PuffLoader } from "react-spinners";

function EventDetails() {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();

  const handleShare = (eventId, eventName, eventDescription) => {
    console.log(eventId);
    let dataShare = {
      title: eventName,
      text: eventDescription,
      url: `http://localhost:5173/#/detalle/${eventId}`,
    };
    navigator.share(dataShare).then((res) => {
      console.log("compartir el evento");
    });
  };

  useEffect(() => {
    const getEvent = () => {
      setIsLoading(true);
      getEventById(eventId)
        .then((res) => {
          console.log(res.data[0]);
          setEvent(res.data[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
    getEvent();
  }, []);

  return (
    <>
      {isLoading && <PuffLoader />}
      <section className="bg-dark flex flex-col md:flex-row gap-16 p-8 rounded-2xl mx-auto my-28 w-2/3 bg-pattern">
        <div className="w-full lg:w-1/3 rounded-2xl">
          <img
            className="w-full"
            src={`http://localhost/ventra-API/${event.cover}`}
            alt={event.description}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl">{event.name}</h1>
          <p>{event.venue}</p>
          <p>{event.date ? event.date.slice(0, 10) : ""}</p>
          <p className="text-lg">${event.price}</p>
          <div className="flex gap-4">
            {!event.isFree ? (
              <Link
                className="rounded-2xl bg-green py-2 px-4 my-4 w-fit text-dark"
                to={`/detalle/comprar/${event._id}`}
              >
                Comprar
              </Link>
            ) : (
              <p className="rounded-2xl bg-green py-2 px-4 my-4 w-fit text-dark">
                Evento Gratuito
              </p>
            )}

            <button
              onClick={() => {
                handleShare(event._id, event.name, event.description);
              }}
              className="rounded-2xl bg-orange py-2 px-4 my-4 w-fit text-dark"
            >
              Compartir
            </button>
          </div>
          {event.visibility === "private" ? (
            <p className="text-red-400">
              Este es un evento privado, solo vos y quienes tengan el link
              pueden verlo.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}

export { EventDetails };

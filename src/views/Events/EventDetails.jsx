import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../../index.js";
import { PuffLoader } from "react-spinners";

function EventDetails() {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();

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
      <section className="bg-dark flex gap-16 p-8 rounded-2xl mx-auto my-8 w-2/3">
        <div className="w-1/3 rounded-2xl">
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
          <Link
            className="rounded-2xl bg-green py-2 px-4 my-4 w-fit text-dark"
            to={`/detalle/comprar/${event._id}`}
          >
            Comprar
          </Link>
        </div>
      </section>
    </>
  );
}

export { EventDetails };

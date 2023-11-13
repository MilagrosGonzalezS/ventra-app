import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getEventById from "../functions/getEventToEdit";
import { PuffLoader } from "react-spinners";

function BuyTicket() {
  const { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEvent = () => {
      setIsLoading(true);
      getEventById(eventId)
        .then((res) => {
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
      {isLoading && (
        <PuffLoader
          className="absolute left-1/2 -translate-x-1/2 top-10"
          color="#04b290"
        />
      )}
      <section>
        <h3>{event.name}</h3>
        <p>{event.category}</p>
        <p>{event.price}</p>
        <p>{event.description}</p>
      </section>
    </>
  );
}

export default BuyTicket;

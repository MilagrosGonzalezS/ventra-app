import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext.jsx";
import {
  createTicketFromResell,
  deleteFromResell,
  deleteTicket,
  getEventById,
} from "../index.js";
import colors from "../assets/imgs/recurso-colores.png";

function ResellPaymentSuccess() {
  const [tokenExists, setTokenExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState([]);

  const { name, eventId, ticketId, resellId, timestamp } = useParams();
  const { auth } = useContext(AuthContext);
  const token = auth;

  const ticketData = {
    eventId: event._id,
    eventName: event.name,
    eventVenue: event.venue,
    eventDate: event.date,
    eventTime: event.time,
    eventPrice: event.price,
    timestamp: timestamp,
  };

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        setTokenExists(true);
      }
      setIsLoading(false);
    };
    getEventById(eventId).then((res) => {
      setEvent(res.data[0]);
      setIsLoading(false);
    });
    checkToken();
  }, []);

  useEffect(() => {
    const ticketCreation = async () => {
      try {
        await createTicketFromResell(ticketData).then((res) => {
          console.log(res + "se creo el nuevo ticket");
        });
        await deleteTicket(ticketId).then((res) => {
          console.log(res + "se elimino el ticket viejo");
        });
        await deleteFromResell(resellId)
          .then((res) => {
            console.log(res + "Se quitó el ticket de la lista de reventa");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error + "error al crear y borrar tickets");
      }
    };

    ticketCreation();
  }, [event]);

  return isLoading ? (
    <PuffLoader
      className="absolute left-1/2 -translate-x-1/2 top-10"
      color="#04b290"
    />
  ) : (
    <>
      <main className="min-h-screen bg-eventdetail md:px-20 px-10 grid grid-cols-12 gap-10 place-items-center">
        <div className="py-16 h-fit px-24 rounded-3xl bg-dark flex flex-col gap-6 col-span-8 m-auto items-center justify-center text-center">
          <h1 className="text-5xl font-accent">¡Pago exitoso!</h1>
          <img src={colors} alt="recurso de colores" />
          <p> Compraste 1 entrada para {name}.</p>
          <p className="text-xs">
            Muchas gracias por confiar en Ventra, ¡esperamos que disfrutes tu
            compra! Si tenés alguna pregunta, no dudes en contactarnos.
            ¡Esperamos verte pronto!
          </p>
          <Link
            className="bg-green py-4 px-8 text-dark rounded-xl font-medium"
            to="/mi-cuenta/tickets"
          >
            Ver mis Tickets
          </Link>
        </div>
      </main>
    </>
  );
}

export { ResellPaymentSuccess };

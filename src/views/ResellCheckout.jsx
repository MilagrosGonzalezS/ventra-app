import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getEventById,
  createTicket,
  createPreferenceResell,
} from "../index.js";
import { PuffLoader } from "react-spinners";
import { format } from "date-fns";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";

function ResellCheckout() {
  const { eventId, amount, price, ticketId, resellId } = useParams();
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-6936f287-7882-4e48-bbec-96cf610d2a63", {
    locale: "es-AR",
  });

  const servicePrice = (parseInt(price) * 10) / 100;
  const totalPrice = parseInt(price) + servicePrice;

  console.log(servicePrice);
  console.log(totalPrice);
  console.log(event._id);

  const preferenceData = {
    title: event.name,
    quantity: 1,
    price: totalPrice,
    eventId: event._id,
    ticketId: ticketId,
    resellId: resellId,
  };

  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  const customization = {
    checkout: {
      theme: {
        elementsColor: "#04b290",
        headerColor: "#4287F5",
      },
    },
    visual: {
      buttonBackground: "white",
      borderRadius: "18px",
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const getEvent = () => {
      getEventById(eventId)
        .then((res) => {
          setEvent(res.data[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getEvent();
  }, []);

  useEffect(() => {
    const handleCreatePreference = async () => {
      await createPreferenceResell(preferenceData).then((res) => {
        console.log(res.id);
        const id = res.id;
        if (id) {
          setPreferenceId(id);
          console.log(preferenceId);
        }
      });
    };

    handleCreatePreference();
    setIsLoading(false);
  }, [event]);

  return (
    <>
      {isLoading ? (
        <PuffLoader
          className="absolute left-1/2 -translate-x-1/2 top-60"
          color="#04b290"
        />
      ) : (
        <main className="min-h-screen bg-eventdetail md:px-20 px-10 grid grid-cols-12 gap-10">
          <div className="col-span-7 mt-40">
            <div className="h-fit bg-dark rounded-3xl w-full xl:mt-80 flex justify-between items-center mb-4 gap-10">
              <img
                className="w-1/4 rounded-3xl "
                src={`http://localhost/ventra-API/${event.cover}`}
                alt={event.description}
              />
              <div className="my-4 w-full pr-16">
                <h3 className="text-light text-2xl font-accent font-medium tracking-wider">
                  {event.name} x1
                </h3>
                <div className="flex mt-4 justify-between">
                  <div className="flex gap-2 items-center my-2">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-lightblue"
                    />
                    <p>{formatDate(event.date)}</p>
                  </div>
                  <div className="flex gap-2 items-center my-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-lightblue"
                    />
                    <p>{event.time}</p>
                  </div>
                </div>
                <div className="flex mt-4 justify-between">
                  <div className="flex gap-2 items-center my-2">
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="text-lightblue"
                    />
                    <p>{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 ">
            <div className="flex flex-col justify-evenly gap-8 bg-dark rounded-3xl h-fit mt-40 ml-16 py-10 px-12 text-center">
              <h2 className="font-accent text-xl">Resumen de compra:</h2>
              <div className="flex justify-between">
                <p>Entrada general x1</p>
                <p>${price}</p>
              </div>
              <div className="flex justify-between">
                <p>Cargo por servicio</p>
                <p>${servicePrice}</p>
              </div>
              <hr></hr>
              <div className="flex justify-between">
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>
            </div>

            <div className="ml-16 mt-4">
              {preferenceId && (
                <Wallet
                  initialization={{ preferenceId: preferenceId }}
                  customization={customization}
                />
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export { ResellCheckout };

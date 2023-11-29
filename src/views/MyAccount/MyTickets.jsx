import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyTickets } from "../../index.js";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

function MyTickets() {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMyTickets()
      .then((ticketsData) => {
        const sortedTickets = ticketsData.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTickets(sortedTickets);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <section className="flex-col items-center p-10">
        <h1 className="font-accent text-2xl text-center">Tus entradas</h1>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex flex-col items-center gap-16 flex-wrap mt-16">
            {tickets.length === 0 ? (
              <p className="font-accent text-center">
                Aún no tenés ninguna entrada comprada.
              </p>
            ) : (
              tickets.map((ticket) => (
                <article
                  key={ticket._id}
                  className="w-full md:w-2/3 bg-opacity rounded-xl border py-5 px-6"
                >
                  <p className="text-gray-500">
                    Órden número: {ticket._id.slice(0, 6)}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-xl ">{ticket.eventName}</strong>
                    <p className="px-2 rounded-md">
                      {ticket.eventDate ? ticket.eventDate.slice(0, 10) : ""}
                    </p>
                    <p className="px-2 rounded-md">{ticket.eventTime}</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="mb-4">{ticket.eventVenue}</p>
                      <p>$ {ticket.eventPrice}</p>
                    </div>
                    <QRCode className="w-1/6 h-fit" value={ticket._id} />
                  </div>
                  <button className="bg-orange text-dark py-1 px-4 rounded-lg font-medium hover:bg-amber-700">
                    Descargar Ticket
                    <FontAwesomeIcon
                      icon={faCircleChevronDown}
                      color="#141414"
                      className="ml-3"
                    />
                  </button>
                </article>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
}

export { MyTickets };

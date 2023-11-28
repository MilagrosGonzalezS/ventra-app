import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyTickets } from "../../index.js";
import QRCode from "react-qr-code";

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
      <section className="flex-col items-center">
        <h1 className="font-accent text-2xl text-center">Mis Tickets</h1>
        <h2 className="font-accent text-xl text-center">
          Acá podés encontrar la lista de todas tus entradas
        </h2>
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
                  className="w-2/5 bg-opacity rounded-xl border p-8"
                >
                  <p className="text-gray-500">Órden número: {ticket._id}</p>
                  <QRCode value={ticket._id} />
                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-xl ">{ticket.eventName}</strong>
                    <div className="flex gap-2">
                      <p className="bg-green text-dark px-2 rounded-md">
                        {ticket.eventTime}
                      </p>
                      <p className="bg-green text-dark px-2 rounded-md">
                        {ticket.eventDate ? ticket.eventDate.slice(0, 10) : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="bg-pink px-2 rounded-md">
                      {ticket.eventVenue}
                    </p>
                  </div>
                  <div className=" flex justify-between mb-4">
                    <p className="bg-green text-dark px-2 rounded-md">
                      $ {ticket.eventPrice}
                    </p>
                  </div>
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

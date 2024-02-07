import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyTickets } from "../../index.js";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/imgs/recurso-colores.png";

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
      <section className="flex flex-col items-start mt-8">
        <div className="flex items-center gap-4">
          <div className="w-16">
            <img
              className="w-full"
              src={colors}
              alt="recurso gráfico de colores"
            />
          </div>
          <h2 className="text-xl md:text-2xl font-accent">Mis tickets</h2>
        </div>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="w-full my-8">
            {tickets.length === 0 ? (
              <p>Aún no tenés ninguna entrada comprada.</p>
            ) : (
              <table className="w-full bg-dark text-light rounded-xl p-4 text-center text-sm">
                <thead>
                  <tr className=" divide-x divide-gray-500">
                    <th className="py-4">Nro. Orden</th>
                    <th className="py-4">Evento</th>
                    <th className="py-4">Fecha</th>
                    <th className="py-4">Hora</th>
                    <th className="py-4">Lugar</th>
                    <th className="py-4">Precio</th>
                    <th className="py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="my-4  divide-x divide-gray-500"
                    >
                      <td className="py-4">{ticket._id.slice(0, 6)}</td>
                      <td className="py-4">{ticket.eventName}</td>
                      <td className="py-4">
                        {ticket.eventDate ? ticket.eventDate.slice(0, 10) : ""}
                      </td>
                      <td className="py-4">{ticket.eventTime}</td>
                      <td className="py-4">{ticket.eventVenue}</td>
                      <td className="py-4">$ {ticket.eventPrice}</td>
                      <td className="py-4">
                        <button className="bg-orange text-dark px-2 rounded-lg font-medium hover:bg-amber-700">
                          Descargar Ticket
                          <FontAwesomeIcon
                            icon={faCircleChevronDown}
                            color="#141414"
                            className="ml-3"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export { MyTickets };

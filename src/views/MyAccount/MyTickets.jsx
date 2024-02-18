import { React, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyTickets } from "../../index.js";
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/imgs/recurso-colores.png";
import { format } from "date-fns";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   ReactPDF,
// } from "@react-pdf/renderer";

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
  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  // // Create styles
  // const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: "row",
  //     backgroundColor: "#E4E4E4",
  //   },
  //   section: {
  //     margin: 10,
  //     padding: 10,
  //     flexGrow: 1,
  //   },
  // });

  // // Create Document Component
  // const MyDocument = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>Section #1</Text>
  //       </View>
  //       <View style={styles.section}>
  //         <Text>Section #2</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  // ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

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
              <div className="w-4/5">
                {tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="w-full mb-8 rounded-3xl bg-dark flex gap-12"
                  >
                    <div className="bg-lightblue rounded-3xl p-3 w-fit">
                      <div className="bg-light rounded-2xl p-3">
                        <QRCode
                          value={ticket._id}
                          className="w-32 h-32 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="my-4 w-full pr-16">
                      <h3 className="text-light text-2xl font-accent font-medium tracking-wider">
                        {ticket.eventName}
                      </h3>
                      <div className="flex mt-4 justify-between">
                        <div className="flex gap-2 items-center my-2">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="text-lightblue"
                          />
                          <p>{formatDate(ticket.eventDate)}</p>
                        </div>
                        <div className="flex gap-2 items-center my-2">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-lightblue"
                          />
                          <p>{ticket.eventTime}</p>
                        </div>
                      </div>
                      <div className="flex mt-4 justify-between">
                        <div className="flex gap-2 items-center my-2">
                          <FontAwesomeIcon
                            icon={faLocationPin}
                            className="text-lightblue"
                          />
                          <p>{ticket.eventVenue}</p>
                        </div>
                        <div className="flex gap-2 items-center my-2">
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="text-lightblue"
                          />
                          <p>Descargar</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              /* <table className="w-full bg-dark text-light rounded-xl p-4 text-center text-sm">
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
              </table> */
            )}
          </div>
        )}
      </section>
    </>
  );
}

export { MyTickets };

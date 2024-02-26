import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyTickets } from "../../index.js";
import QRCode from "react-qr-code";
import qrCode from "qrcode";
import logoVentra from "../../assets/imgs/logo-blanco.png";
import calendar from "../../assets/imgs/calendar-alt.png";
import clock from "../../assets/imgs/clock.png";
import mapMarker from "../../assets/imgs/map-marker-alt.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faLocationPin,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/imgs/recurso-colores.png";
import { format } from "date-fns";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  container: {
    backgroundColor: "#181818",
    padding: "15px 20px 0px 20px",
    borderRadius: "10px",
  },
  ticketContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  qrCode: {
    marginRight: 20,
    width: 120,
    height: 120,
    borderRadius: "10px",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    verticalAlign: "center",
    gap: "10px",
    marginBottom: 15,
  },
  icon: {
    width: 15,
    height: 15,
  },
  ventraContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: "15px",
  },
  colors: {
    width: 40,
  },
  logo: {
    width: 90,
  },
  text: {
    fontSize: 12,
    color: "#FCFCFC",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FCFCFC",
  },
});

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

  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };
  const generateQRCode = async (value) => {
    try {
      // Genera el código QR como una imagen en formato base64
      const qrDataUrl = await qrCode.toDataURL(value);
      return qrDataUrl;
    } catch (error) {
      console.error("Error al generar el código QR:", error);
      return null;
    }
  };

  const TicketDocument = ({ ticket }) => {
    const qrDataUrl = generateQRCode(ticket._id);

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <View style={styles.ventraContainer}>
              <Image
                style={styles.colors}
                src={colors}
                alt="recurso gráfico de colores"
              ></Image>
              <Image
                style={styles.logo}
                src={logoVentra}
                alt="logo Ventra"
              ></Image>
            </View>

            <View style={styles.ticketContainer}>
              {qrDataUrl && <Image src={qrDataUrl} style={styles.qrCode} />}
              <View>
                <Text style={styles.title}>{ticket.eventName}</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.icon}
                    src={calendar}
                    alt="icono de calendario"
                  ></Image>
                  <Text style={styles.text}>
                    {formatDate(ticket.eventDate)}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.icon}
                    src={clock}
                    alt="icono de reloj"
                  ></Image>
                  <Text style={styles.text}>
                    <Text style={styles.text}> {ticket.eventTime}</Text>
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.icon}
                    src={mapMarker}
                    alt="icono de marcador en el mapa"
                  ></Image>
                  <Text style={styles.text}>
                    <Text style={styles.text}>{ticket.eventVenue}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

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

                        <PDFDownloadLink
                          document={<TicketDocument ticket={ticket} />}
                          fileName={`ticket_${ticket.eventName}_${ticket._id}.pdf`}
                        >
                          {({ loading }) =>
                            loading ? (
                              <span>Descargando...</span>
                            ) : (
                              <div className="flex gap-2 items-center my-2">
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="text-lightblue"
                                  style={{ cursor: "pointer" }}
                                />
                                <p>Descargar</p>
                              </div>
                            )
                          }
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export { MyTickets };

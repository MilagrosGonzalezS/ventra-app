import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import {
  getMyTickets,
  createResellTicket,
  updatePublishedTicket,
  findByEmail,
  transferTicket,
  getAllEvents,
  deleteFromResell,
} from "../../index.js";
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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Radio,
  RadioGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

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

function MyTickets({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [isOpen2, setIsOpen2] = useState({});
  const [isOpen3, setIsOpen3] = useState({});
  const [selectedTicket, setSelectedTicket] = useState("");
  const [events, setEvents] = useState([]);
  const [dynamicButton, setDynamicButton] = useState("Publicado en reventa");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    getAllEvents().then((allEvents) => {
      setEvents(allEvents.data.events);
    });
  }, []);

  const onOpenModal = (ticketId) => {
    setSelectedTicket(ticketId);
    setIsOpen((prev) => ({
      ...prev,
      [ticketId]: true,
    }));
  };

  const onOpenModal2 = (ticketId) => {
    setSelectedTicket(ticketId);
    setIsOpen2((prev) => ({
      ...prev,
      [ticketId]: true,
    }));
  };

  const onOpenModal3 = (ticketId) => {
    setIsOpen3((prev) => ({
      ...prev,
      [ticketId]: true,
    }));
  };

  const onCloseModal = (ticketId) => {
    setIsOpen((prev) => ({
      ...prev,
      [ticketId]: false,
    }));
  };

  const onCloseModal2 = (ticketId) => {
    setIsOpen2((prev) => ({
      ...prev,
      [ticketId]: false,
    }));
  };

  const onCloseModal3 = (ticketId) => {
    setIsOpen3((prev) => ({
      ...prev,
      [ticketId]: false,
    }));
  };

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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const selectedEvent = tickets.find(
      (ticket) => selectedTicket == ticket._id
    );
    const resellTicketData = {
      ticketId: selectedTicket,
      eventId: selectedEvent.eventId,
      userId: selectedEvent.userId,
      ticketPrice: parseInt(data.price),
      username: user.username,
    };
    try {
      await createResellTicket(resellTicketData).then(() => {
        updatePublishedTicket(selectedTicket, "published").then(
          window.location.reload(true),
          console.log("ticket actualizado")
        );
      });
    } catch (error) {
      console.log(error + "error al publicar");
      toast.error("Error al publicar el ticket");
    }
  };

  const onSubmit2 = async (data, event) => {
    event.preventDefault();
    let ticketId = data.ticketId;
    let email = data.email;
    try {
      await findByEmail(email).then((res) => {
        if (res) {
          let newUserId = res._id;
          transferTicket(ticketId, newUserId).then((res) => {
            console.log("Ticket transferido");
            toast.success("¡Transferiste tu ticket con éxito!");
            setTimeout(() => {
              window.location.reload(true);
            }, 1500);
          });
        } else {
          console.log("Error, mismo usuario");
          toast.error("No te podés transferir a vos mismo");
        }
      });
    } catch (error) {
      console.log(error + "El usuario no está registrado");
      toast.error("El usuario no está registrado");
    }
  };

  const handleRemoveFromResell = async (ticketId) => {
    console.log("remove ticket: " + ticketId);
    try {
      await deleteFromResell(ticketId)
        .then((res) => {
          console.log(res + "Se quitó el ticket de la lista de reventa");
          updatePublishedTicket(ticketId, "available").then(
            window.location.reload(true),
            console.log("ticket actualizado")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err + "no se quitó el ticket de reventa");
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
                {tickets.map((ticket) => {
                  const ticketEvent = events.find(
                    (event) => event._id === ticket.eventId
                  );
                  return (
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
                        <div className="flex justify-between">
                          <h3 className="text-light text-2xl font-accent font-medium tracking-wider">
                            {ticket.eventName}
                          </h3>
                          {ticket.state == "published" ? (
                            <>
                              <Button
                                className="bg-lightblue border py-2 px-4 text-xs rounded-2xl text-dark font-medium hover:text-light hover:bg-dark"
                                onMouseEnter={() =>
                                  setDynamicButton("Quitar de reventa")
                                }
                                onMouseLeave={() =>
                                  setDynamicButton("Publicado en reventa")
                                }
                                onPress={() => onOpenModal3(ticket._id)}
                              >
                                {dynamicButton}
                              </Button>
                              <Modal
                                size="xl"
                                backdrop="opaque"
                                isOpen={isOpen3[ticket._id]}
                                isDismissable={true}
                                onOpenChange={() => onCloseModal3(ticket._id)}
                                classNames={{
                                  backdrop:
                                    "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                                }}
                              >
                                <ModalContent>
                                  {(onClose3) => (
                                    <>
                                      <ModalHeader className="flex flex-col gap-1">
                                        ¿Estás seguro de que querés quitar tu
                                        entrada de reventa?
                                      </ModalHeader>
                                      <ModalFooter>
                                        <Button
                                          color="default"
                                          onPress={onClose3}
                                        >
                                          No, volver
                                        </Button>
                                        <Button
                                          color="primary"
                                          type="submit"
                                          onPress={onClose3}
                                          onClick={() =>
                                            handleRemoveFromResell(ticket._id)
                                          }
                                        >
                                          Si, quitar de reventa
                                        </Button>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
                            </>
                          ) : (
                            <>
                              <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                  <button
                                    type="button"
                                    className="inline-block text-gray-500 hover:text-gray-700"
                                  >
                                    <svg
                                      className="inline-block h-6 w-6 fill-white"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                    </svg>
                                  </button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label="Ticket Actions"
                                  variant="flat"
                                >
                                  {ticketEvent &&
                                    ticketEvent.ticketCount == 0 && (
                                      <DropdownItem
                                        key="reventa"
                                        onPress={() => onOpenModal(ticket._id)}
                                      >
                                        Publicar en reventa
                                      </DropdownItem>
                                    )}
                                  <DropdownItem
                                    key="transferir"
                                    onPress={() => onOpenModal2(ticket._id)}
                                  >
                                    Transferir
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                              <Modal
                                size="xl"
                                backdrop="opaque"
                                isOpen={isOpen[ticket._id]}
                                isDismissable={true}
                                onOpenChange={() => onCloseModal(ticket._id)}
                                classNames={{
                                  backdrop:
                                    "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                                }}
                              >
                                <ModalContent>
                                  {(onClose) => (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                      <ModalHeader className="flex flex-col gap-1">
                                        Elegí el precio con el que publicás tu
                                        entrada
                                      </ModalHeader>
                                      <ModalBody>
                                        <RadioGroup {...register("price")}>
                                          <Radio
                                            value={ticket.eventPrice}
                                            description="Perdés el costo
                                        de servicio"
                                            {...register("price")}
                                          >
                                            ${ticket.eventPrice}
                                          </Radio>
                                          <Radio
                                            value={
                                              (ticket.eventPrice * 10) / 100 +
                                              ticket.eventPrice
                                            }
                                            description="Recibís lo mismo que pagaste"
                                            {...register("price")}
                                          >
                                            $
                                            {(ticket.eventPrice * 10) / 100 +
                                              ticket.eventPrice}
                                          </Radio>
                                        </RadioGroup>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          color="default"
                                          onPress={onClose}
                                        >
                                          Cerrar
                                        </Button>
                                        <Button
                                          color="primary"
                                          type="submit"
                                          onPress={onClose}
                                        >
                                          Publicar
                                        </Button>
                                      </ModalFooter>
                                    </form>
                                  )}
                                </ModalContent>
                              </Modal>
                              <Modal
                                size="xl"
                                backdrop="opaque"
                                isOpen={isOpen2[ticket._id]}
                                isDismissable={true}
                                onOpenChange={() => onCloseModal2(ticket._id)}
                                classNames={{
                                  backdrop:
                                    "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                                }}
                              >
                                <ModalContent>
                                  {(onClose2) => (
                                    <form onSubmit={handleSubmit(onSubmit2)}>
                                      <ModalHeader className="flex flex-col gap-1">
                                        Ingresá el email de la persona a la que
                                        querés transferir tu entrada
                                      </ModalHeader>
                                      <ModalBody>
                                        <input
                                          className="hidden"
                                          id="ticketId"
                                          name="ticketId"
                                          value={ticket._id}
                                          {...register("ticketId")}
                                        />
                                        <input
                                          className="p-4 rounded-2xl"
                                          id="email"
                                          name="email"
                                          placeholder="Email"
                                          {...register("email")}
                                        />
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          color="default"
                                          onPress={onClose2}
                                        >
                                          Cerrar
                                        </Button>
                                        <Button
                                          color="primary"
                                          type="submit"
                                          onPress={onClose2}
                                        >
                                          Transferir
                                        </Button>
                                      </ModalFooter>
                                    </form>
                                  )}
                                </ModalContent>
                              </Modal>
                            </>
                          )}
                        </div>
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
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>
      <Toaster
        containerStyle={{
          marginBottom: "8rem",
        }}
        position="center-center"
        toastOptions={{
          success: {
            style: {
              background: "#232323",
              color: "#FCFCFC",
            },
          },
          error: {
            style: {
              background: "#232323",
              color: "#FCFCFC",
            },
          },
        }}
      />
    </>
  );
}

export { MyTickets };

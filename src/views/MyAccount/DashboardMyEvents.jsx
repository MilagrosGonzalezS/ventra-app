import { useState } from "react";
import logo from "../../assets/imgs/logo-icon.png";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faPieChart,
  faTicket,
  faGlassCheers,
  faListCheck,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  EventsTable,
  EventsTickets,
  Planification,
  Analytics,
} from "../../index.js";

function DashboardMyEvents() {
  const [selectedView, setSelectedView] = useState("events");
  const navigate = useNavigate();
  const handleView = (view) => {
    if (view == "analytics") {
      setSelectedView(view);
    } else if (view == "events") {
      setSelectedView(view);
    } else if (view == "tickets") {
      setSelectedView(view);
    } else if (view == "planification") {
      setSelectedView(view);
    }
  };

  function handleNavigation() {
    navigate("/mi-cuenta");
  }

  return (
    <>
      <main className="bg-dashboard md:px-20 px-10 grid grid-cols-12 gap-10">
        <aside className="h-fit bg-dark rounded-3xl p-6 col-span-3 mt-36 flex flex-col justify-evenly gap-4 items-center mb-20">
          <img className="my-2 w-2/4" src={logo} alt="logo de ventra"></img>
          <Button
            startContent={<FontAwesomeIcon icon={faGlassCheers} />}
            className={
              selectedView === "events"
                ? "w-full bg-orange"
                : "w-full bg-graydarker hover:bg-orange"
            }
            onClick={() => handleView("events")}
          >
            Eventos
          </Button>
          <Button
            startContent={<FontAwesomeIcon icon={faPieChart} />}
            className={
              selectedView === "analytics"
                ? "w-full bg-orange"
                : "w-full bg-graydarker hover:bg-orange"
            }
            onClick={() => handleView("analytics")}
          >
            Analíticas
          </Button>

          <Button
            startContent={<FontAwesomeIcon icon={faTicket} />}
            className={
              selectedView === "tickets"
                ? "w-full bg-orange"
                : "w-full bg-graydarker hover:bg-orange"
            }
            onClick={() => handleView("tickets")}
          >
            Entradas
          </Button>
          <Button
            startContent={<FontAwesomeIcon icon={faListCheck} />}
            className={
              selectedView === "planification"
                ? "w-full bg-orange"
                : "w-full bg-graydarker hover:bg-orange"
            }
            onClick={() => handleView("planification")}
          >
            Planificador
          </Button>
          <Button
            startContent={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            className="w-full bg-graydarker hover:bg-pink mt-12"
            onClick={handleNavigation}
          >
            Salir
          </Button>
        </aside>
        <div className="col-span-9">
          {selectedView == "analytics" && <Analytics />}
          {selectedView == "events" && <EventsTable />}
          {selectedView == "tickets" && <EventsTickets />}
          {selectedView == "planification" && <Planification />}
        </div>
      </main>
    </>
  );
}

export { DashboardMyEvents };

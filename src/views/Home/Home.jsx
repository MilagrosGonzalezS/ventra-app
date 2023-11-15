// import React from "react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getEvents } from "../../functions/events.js";
import Search from "../../components/Search";
import MiCard from "../../components/MiCard.jsx";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard.jsx";
import colors from "../../assets/imgs/recurso-colores.png"


function Home() {
  const [tokenExists, setTokenExists] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    }
  }, []);

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res.data);
    });
    setIsLoading(false);
  }, [])


  return (
    <main className="px-20">
      <section className="flex h-[90vh] justify-center items-center bodyBg">
        <div className="w-6/12 p-[100px] flex flex-col">
          <h1 className="font-accent text-[1.6rem] font-semibold">
            Organizá <span className="text-orange">eventos</span> únicos, vendé{" "}
            <span className="text-green">entradas</span> exclusivas y descubrí
            nuevas <span className="text-pink">expreciencias</span>.
          </h1>
          <p className="text-base font-light text-white/60 mt-2">
            Fácil, rápido y sencillo.
          </p>
        <div className="w-6/12 flex flex-col">
          <h1 className="font-accent text-[1.6rem] font-semibold">Organizá <span className="text-orange">eventos</span> únicos, vendé <span className="text-green">entradas</span> exclusivas y descubrí nuevas <span className="text-pink">expreciencias</span>.</h1>
          <p className="text-base font-light text-white/60 mt-2">Fácil, rápido y sencillo.</p>
          <div className="flex gap-3 mt-5">
            <Button className="bg-green text-dark">Explorar eventos</Button>
            {!tokenExists && (
              <Link to="/registrarse">
                <Button color="default" variant="faded">
                  Crear cuenta
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="w-6/12">
          <MiCard></MiCard>
        </div>
      </section>

      <Search onSearchResultsUpdate={setSearchResults} />
      <section className="flex gap-16 justify-start flex-wrap my-4">
      {isLoading && (
         <PuffLoader
           className="absolute left-1/2 -translate-x-1/2 top-10"
           color="#04b290"
         />
       )}
         {searchResults.map((event) => (
          <EventCard key={event._id}
                     name={event.name}
                     category={event.category}
                     venue={event.venue}
                     date={event.date}
                     price={event.price}
                     id={event._id}
          />
        ))}
      </section>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl my-4">Más recientes</h2>
        <div className="w-16"><img className="w-full" src={colors} alt="recurso grafico de colores"/></div>
      </div>
      <section className="flex gap-16 justify-start flex-wrap mt-4">
      {isLoading && (
         <PuffLoader
           className="absolute left-1/2 -translate-x-1/2 top-10"
           color="#04b290"
         />
       )}
      {events.map((event) => (
          <EventCard key={event._id}
                     name={event.name}
                     category={event.category}
                     venue={event.venue}
                     date={event.date}
                     price={event.price}
                     id={event._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;

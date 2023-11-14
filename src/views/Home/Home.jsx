// import React from "react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getEvents } from "../../functions/events.js";
import Search from "../../components/Search";
import MiCard from "../../components/MiCard.jsx";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

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
  }, []);

  return (
    <>
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
        <div className="w-6/12 p-[100px]">
          <MiCard></MiCard>
        </div>
      </section>

      <Search onSearchResultsUpdate={setSearchResults} />

      <section className="flex gap-16 justify-center flex-wrap my-4">
        {searchResults.map((event) => (
          <article
            key={event._id}
            className="w-1/4 bg-opacity rounded-xl border p-8"
          >
            <h3 className="text-xl mb-4">{event.name}</h3>

            <div className="flex justify-between mb-4">
              <p className="bg-green text-dark px-2 rounded-md">
                {event.date ? event.date.slice(0, 10) : ""}
              </p>
              <p className="bg-orange px-2 rounded-md">$ {event.price}</p>
            </div>

            <p>{event.description}</p>
            <div className="flex justify-between my-4 items-center">
              <p className="bg-pink text-white px-2 rounded-md ">
                {event.venue}
              </p>
              <p className="bg-gray-500 text-xs text-white px-2 rounded-md ">
                {event.category}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="flex gap-16 justify-center flex-wrap mt-4">
        {events.map((event) => (
          <article
            key={event._id}
            className="w-1/4 bg-opacity rounded-xl border p-8"
          >
            <h3 className="text-xl mb-4">{event.name}</h3>

            <div className="flex justify-between mb-4">
              <p className="bg-green text-dark px-2 rounded-md">
                {event.date ? event.date.slice(0, 10) : ""}
              </p>
              <p className="bg-orange px-2 rounded-md">$ {event.price}</p>
            </div>

            <p>{event.description}</p>
            <div className="flex justify-between my-4 items-center">
              <p className="bg-pink text-white px-2 rounded-md ">
                {event.venue}
              </p>
              <p className="bg-gray-500 text-xs text-white px-2 rounded-md ">
                {event.category}
              </p>
            </div>
            <Link
              to={`/comprar/${event._id}`}
              className="transition block text-center bg-green font-bold text-dark py-2 rounded-xl w-full hover:bg-lime-600"
            >
              COMPRAR
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}

export default Home;

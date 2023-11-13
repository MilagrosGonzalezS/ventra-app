// import React from "react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getEvents } from "../../functions/events.js";
import Search from "../../components/Search";
import { Link } from "react-router-dom";

function Home() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res.data);
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <div
        className="flex h-[100vh] justify-center items-center"
        id="headerHome"
      >
        <div id="Header" className="flex items-start flex-col w-[50%]">
          <h1 className="font-accent text-6xl">¡Bienvenido!</h1>
          <p className="font-accent text-2xl my-2">
            Te brindamos un espacio donde vas a poder encontrar toda la
            información de tus eventos favoritos
          </p>
        </div>
        <div>
          <Search onSearchResultsUpdate={setSearchResults} />
        </div>
      </div>
      <hr />
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

      <h2 className="font-accent text-center text-2xl mt-2 mb-4">
        Todos los Eventos ♫
      </h2>
      {isLoading && (
        <PuffLoader
          className="absolute left-1/2 -translate-x-1/2 top-10"
          color="#04b290"
        />
      )}
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

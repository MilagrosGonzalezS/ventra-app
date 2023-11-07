// import React from "react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import Search from "../../components/Search";

function Home() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);


  async function fetchEvents() {
    try {
      const response = await fetch(
        "https://ventra-api-e311.onrender.com/events"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los eventos");
      }
      const eventsData = await response.json();
      setEvents(eventsData);
      console.log(eventsData);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchEvents()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex h-[90vh] justify-center items-center">
      <div id="Header" className="flex items-start flex-col w-[50%]">
        <h1 className="font-accent text-6xl">¡Bienvenido!</h1>
        <p className="font-accent text-2xl my-2">
          Te brindamos un espacio donde vas a poder encontrar toda la información de tus eventos favoritos
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
              <p className="bg-pink text-white px-2 rounded-md ">{event.venue}</p>
              <p className="bg-gray-500 text-xs text-white px-2 rounded-md ">
                {event.category}
              </p>
            </div>
          </article>
        ))}
      </section>

      <h2 className="font-accent text-center text-2xl mt-2 mb-4">Todos los Eventos ♫</h2>
      {isLoading && <PuffLoader color="#04b290" />}
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
          </article>
        ))}
      </section>
    </>
  );
}

export default Home;

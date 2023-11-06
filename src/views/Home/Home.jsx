// import React from "react";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import Search from "../../components/Search";

function Home() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      
      <h1 className="font-accent text-center text-6xl my-4">¡Bienvenido!</h1>
      <h2 className="font-accent text-center text-2xl my-2">
        Te brindamos un espacio donde vas a poder encontrar toda la información
        de tus eventos favoritos
      </h2>

      <h2 className="font-accent text-center text-2xl mt-2 mb-4">Eventos ♫</h2>
      <div className="m-4">
        <Search></Search>
      </div>
      <hr />
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

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
      <Search></Search>
      <section className="flex-col items-center">
        <h1 className="font-accent text-2xl">Home ♫</h1>

        <p>
          Te brindamos un espacio donde vas a poder encontrar toda la
          información de tus eventos favoritos
        </p>

        <h2>Eventos ♫</h2>
        {isLoading && <PuffLoader color="#04b290" />}
        <div className="flex gap-16 flex-wrap ">
          {events.map((event) => (
            <article
              key={event._id}
              className="w-1/5 bg-opacity rounded-xl border p-8"
            >
              <p>{event.name}</p>
              <p>{event.description}</p>
              <div className=" flex justify-between">
                <p className="bg-orange rounded-md">$ {event.price}</p>
                <p className="bg-orange rounded-md">{event.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

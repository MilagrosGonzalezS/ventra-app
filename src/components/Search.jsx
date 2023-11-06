import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [eventName, setEventName] = useState("");

  //BUSCAR POR CATEGORIA
  useEffect(() => {
    if (!selectedCategory) {
      setSearchResults([]);
      return;
    }
    const apiUrl = `https://ventra-api-e311.onrender.com/events/category/${selectedCategory}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error al buscar por categoría:", error);
      });
  }, [selectedCategory]);

  //BUSCAR POR NOMBRE
  useEffect(() => {
    if (eventName.trim() === "") {
      setSearchResults([]);
      return;
    }
    const apiUrl = `https://ventra-api-e311.onrender.com/events/find-by-name/${eventName}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error al buscar por nombre de evento:", error);
      });
  }, [eventName]);

  return (
    <div>
      <div className="flex text-dark">
        <input
          className="bg-light h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          type="text"
          placeholder="Nombre del evento"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <div>
          <button
            onClick={() => setSelectedCategory("Concierto de Rock")}
            className="bg-pink text-light px-2 py-1 rounded-md mx-2"
          >
            Rock
          </button>
          <button
            onClick={() => setSelectedCategory("Concierto de pop")}
            className="bg-pink text-light px-2 py-1 rounded-md mx-2"
          >
            Pop
          </button>
          <button
            onClick={() => setSelectedCategory("Concierto de Rap")}
            className="bg-pink text-light px-2 py-1 rounded-md mx-2"
          >
            Rap
          </button>
        </div>
      </div>
      <ul>
        {searchResults.map((event) => (
          <div className="m-3 bg-[#181818] w-[50%] p-2">
            <li
              key={event._id}
              className="w-1/5 bg-opacity rounded-xl border p-8"
            >
              <h2>{event.name}</h2>
              <p>{event.description}</p>

              <p>Fecha: {event.date}</p>
              <p>Lugar: {event.venue}</p>
              <div className=" flex justify-between">
                <p className="bg-orange rounded-md">Precio: ${event.price}</p>
                <p className="bg-orange rounded-md">
                  Categoría: {event.category}
                </p>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Search;

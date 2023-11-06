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
            onClick={() => setSelectedCategory("Concierto de Pop")}
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
      <div className="flex gap-16 justify-center flex-wrap mt-5">
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
        </div>
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import {Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import axios from "axios";
import config from "../config.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onSearchResultsUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [evenstCategory, setEventsCategory] = useState([]);
  const [eventName, setEventName] = useState("");

// BUSCAR POR CATEGORIA
const fetchEventsCategory = async () => {
  const res = await axios.get(`${config.apiEvents}/category/${selectedCategory}`);
  setEventsCategory(res.data);
  onSearchResultsUpdate(res.data)
};

useEffect(() => {
  fetchEventsCategory();
}, [])

useEffect(() => {
  if (!selectedCategory) {
    onSearchResultsUpdate([]); // Actualiza los resultados en el componente padre
    return;
  }
  const apiUrl = `${config.apiEvents}/category/${selectedCategory}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      onSearchResultsUpdate(data); // Actualiza los resultados en el componente padre
    })
    .catch((error) => {
      console.error("Error al buscar por categoría:", error);
    });
}, [selectedCategory, onSearchResultsUpdate]);


// BUSCAR POR NOMBRE
useEffect(() => {
  if (eventName.trim() === "") {
    onSearchResultsUpdate([]); // Actualiza los resultados en el componente padre
    return;
  }
  const apiUrl = `https://ventra-api-e311.onrender.com/events/find-by-name/${eventName}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      onSearchResultsUpdate(data); // Actualiza los resultados en el componente padre
    })
    .catch((error) => {
      console.error("Error al buscar por nombre de evento:", error);
    });
}, [eventName, onSearchResultsUpdate]);


  return (
    
    <div className="flex gap-3">
      <Input
          type="text"
          variant="faded"
          // label="Buscá tu evento"
          placeholder="Buscá tu evento"
          labelPlacement="outside"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          endContent={
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          }
        />
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="faded" 
              endContent={
                <FontAwesomeIcon icon={faFilter} />
              }
            >
              Filtros
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="Rock" onClick={() => setSelectedCategory("Concierto de Rock")}>Rock</DropdownItem>
            <DropdownItem key="Pop" onClick={() => setSelectedCategory("Concierto de Pop")}>Pop</DropdownItem>
            <DropdownItem key="Rap" onClick={() => setSelectedCategory("Concierto de Rap")}>Rap</DropdownItem>
          </DropdownMenu>
        </Dropdown>


      {/* <div className="flex text-dark">
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
      </div> */}
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import config from "../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onSearchResultsUpdate }) => {
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [evenstCategory, setEventsCategory] = useState([]);
  const [eventName, setEventName] = useState("");

  // BUSCAR POR CATEGORIA
  // const fetchEventsCategory = async () => {
  //   const res = await axios.get(
  //     `${config.apiEvents}/category/${selectedCategory}`
  //   );
  //   setEventsCategory(res.data);
  //   onSearchResultsUpdate(res.data);
  // };

  // useEffect(() => {
  //   fetchEventsCategory();
  // }, []);

  // useEffect(() => {
  //   if (!selectedCategory) {
  //     onSearchResultsUpdate([]); // Actualiza los resultados en el componente padre
  //     return;
  //   }
  //   const apiUrl = `${config.apiEvents}/category/${selectedCategory}`;
  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       onSearchResultsUpdate(data); // Actualiza los resultados en el componente padre
  //     })
  //     .catch((error) => {
  //       console.error("Error al buscar por categoría:", error);
  //     });
  // }, [selectedCategory, onSearchResultsUpdate]);

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
    <Input
      type="search"
      variant="faded"
      // label="Buscá tu evento"
      placeholder="Buscá tu evento"
      labelPlacement="outside"
      value={eventName}
      onChange={(e) => setEventName(e.target.value)}
      endContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
    />
  );
};
export { Search };

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
const Filter = ({ onSearchResultsUpdate, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [evenstCategory, setEventsCategory] = useState([]);
  const categories = [
    "Concierto De Rock",
    "Concierto De Pop",
    "Fiesta Electrónica",
    "Concierto De Rap",
    "Festival De Bandas",
    "Fiesta",
    "Cumpleaños",
    "Reunión",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  // BUSCAR POR CATEGORIA
  useEffect(() => {
    if (!selectedCategory) {
      onSearchResultsUpdate([]); // Actualiza los resultados en el componente padre
      return;
    }
    const apiUrl = `${config.apiEvents}/category/${selectedCategory}`;
    axios
      .get(apiUrl)
      .then((response) => {
        onSearchResultsUpdate(response.data); // Actualiza los resultados en el componente padre
      })
      .catch((error) => {
        console.error("Error al buscar por categoría:", error);
      });
  }, [selectedCategory, onSearchResultsUpdate]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="faded"
          endContent={<FontAwesomeIcon icon={faFilter} />}
        >
          Filtros
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {categories.map((category) => (
          <DropdownItem
            key={category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export { Filter };

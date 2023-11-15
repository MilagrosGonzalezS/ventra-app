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
const Filter = ({ onSearchResultsUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [evenstCategory, setEventsCategory] = useState([]);

  // BUSCAR POR CATEGORIA
  // const fetchEventsCategory = async () => {
  //   const res = await axios.get(
  //     `${config.apiEvents}/category/${selectedCategory}`
  //   );
  //   setEventsCategory(res.data);
  //   onSearchResultsUpdate(res.data);
  // };

  useEffect(() => {
    // fetchEventsCategory();
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
        <DropdownItem
          key="Rock"
          onClick={() => setSelectedCategory("Concierto de Rock")}
        >
          Rock
        </DropdownItem>
        <DropdownItem
          key="Pop"
          onClick={() => setSelectedCategory("Concierto de Pop")}
        >
          Pop
        </DropdownItem>
        <DropdownItem
          key="Rap"
          onClick={() => setSelectedCategory("Concierto de Rap")}
        >
          Rap
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { Filter };

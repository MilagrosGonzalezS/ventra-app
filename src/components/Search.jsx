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
  const [eventName, setEventName] = useState("");

  // BUSCAR POR NOMBRE
  useEffect(() => {
    if (eventName.trim() === "") {
      onSearchResultsUpdate([]);
      return;
    }
    const apiUrl = `${config.apiEvents}/find-by-name/${eventName}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        onSearchResultsUpdate(data);
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

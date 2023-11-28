import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import config from "../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onSearchResultsUpdate, onSearchSelect }) => {
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!eventName.trim()) {
          onSearchResultsUpdate([]);
          return;
        }
        const apiUrl = `${config.apiEvents}/find-by-name/${eventName}`;
        const response = await axios.get(apiUrl);
        onSearchResultsUpdate(response.data);
      } catch (error) {
        console.error("Error al buscar por nombre de evento:", error);
      }
    };

    fetchData();
  }, [eventName, onSearchResultsUpdate]);

  const handleChange = (value) => {
    setEventName(value);
    onSearchSelect(value);
  };

  return (
    <Input
      type="search"
      variant="faded"
      placeholder="Buscá tu evento"
      labelPlacement="outside"
      value={eventName}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={() => onSearchSelect(eventName)}
      startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
    />
  );
};

export { Search };

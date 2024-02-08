import React, { useState, useEffect } from "react";
import { getCategories } from "../index.js";
import { Select, SelectItem, Slider, Chip } from "@nextui-org/react";
import axios from "axios";
import config from "../config.json";

const Filter = ({ onSearchResultsUpdate, onCategorySelect, onZoneSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [categories, setCategories] = useState([]);
  console.log("Categories", categories);
  const zones = ["", "CABA", "Zona Norte", "Zona Oeste", "Zona Sur"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedCategory) {
          onSearchResultsUpdate([]);
          return;
        }
        const apiUrl = `${config.apiEvents}/category/${selectedCategory}`;
        const response = await axios.get(apiUrl);
        onSearchResultsUpdate(response.data);
      } catch (error) {
        console.error("Error al buscar por categoría:", error);
      }
    };

    fetchData();
  }, [selectedCategory, onSearchResultsUpdate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedZone) {
          onSearchResultsUpdate([]);
          return;
        }
        const apiUrl = `${config.apiEvents}/zone/${selectedZone}`;
        const response = await axios.get(apiUrl);
        onSearchResultsUpdate(response.data);
      } catch (error) {
        console.error("Error al buscar por categoría:", error);
      }
    };

    fetchData();
  }, [selectedZone, onSearchResultsUpdate]);

  //TRAER CATEGORIAS PARA SELECT
  useEffect(() => {
    getCategories().then((data) => {
      console.log("dataUseEffect", data);
      setCategories(data);
    });
  }, []);

  function resetFilter() {
    onSearchResultsUpdate([]);
    setSelectedCategory("");
    setSelectedZone("");
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    onZoneSelect(null);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    onZoneSelect(zone);
    onCategorySelect(null);
  };

  return (
    <>
      {" "}
      <div className="flex items-center justify-between gap-4 mb-4">
        <p>Filtros</p>
        <button onClick={resetFilter}>Borrar filtro</button>
      </div>
      <div className="my-6">
        <div className="flex flex-wrap gap-6">
          {categories.map((category) => (
            <Chip
              className="cursor-pointer"
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </Chip>
          ))}
        </div>
        <div className="my-6">
          <Select
            placeholder="Zona"
            className="max-w-xs"
            onChange={(e) => handleZoneClick(e.target.value)}
          >
            {zones.map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="my-6">
          <Slider
            label="Precio"
            step={20000}
            maxValue={200000}
            minValue={0}
            defaultValue={[0, 800]}
            showSteps={true}
            showTooltip={true}
            showOutline={true}
            disableThumbScale={true}
            formatOptions={{ style: "currency", currency: "ARS" }}
            tooltipValueFormatOptions={{
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 0,
            }}
            classNames={{
              base: "max-w-md",
              filler: "bg-gradient-to-r from-lightblue to-green",
              labelWrapper: "mb-2",
              label: "font-medium text-default-700 text-medium",
              value: "font-medium text-default-500 text-small",
              thumb: [
                "transition-size",
                "bg-gradient-to-r from-lightblue to-green",
                "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
              ],
              step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
            }}
            tooltipProps={{
              offset: 10,
              placement: "bottom",
              classNames: {
                base: [
                  // arrow color
                  "before:bg-gradient-to-r before:from-lightblue before:to-green",
                ],
                content: [
                  "py-2 shadow-xl",
                  "text-dark font-medium bg-gradient-to-r from-lightblue to-green",
                ],
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export { Filter };

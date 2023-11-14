import React from 'react'

const [selectedCategory, setSelectedCategory] = useState("");
const [evenstCategory, setEventsCategory] = useState([]);

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

const Filter = () => {
  return (
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
  )
}

export default Filter
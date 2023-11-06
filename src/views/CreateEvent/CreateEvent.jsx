import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateEvent() {
  const [eventData, setEventData] = useState({
    name: "",
    location: "",
    venue: "",
    price: 0,
    date: "",
    category: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el objeto de datos del evento a partir del estado
    const eventDataToSend = {
      name: eventData.name,
      description: eventData.description,
      price: eventData.price,
      date: eventData.date,
      state: "Publicado", // Agrega otros campos si es necesario
      venue: eventData.venue,
      category: eventData.category,
      status: true,
    };

    // Realizar la solicitud POST a la API
    fetch("https://ventra-api-e311.onrender.com/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventDataToSend),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Evento creado exitosamente");
          return navigate("/home");
        } else {
          setMessage("Error al crear el evento");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error al conectarse a la API");
      });
  };
  console.log(message);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex justify-center my-8">
        <h1 className="text-4xl font-accent text-pink font-semibold">
          CREÁ TU EVENTO
        </h1>
      </div>
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap lg:flex-row lg:items-center lg:justify-evenly bg-opacity text-light p-8 rounded-3xl w-10/12 "
        >
          <div className="w-1/3">
            <label htmlFor="name">Nombre</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
              type="text"
              name="name"
              id="name"
              value={eventData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="venue">Ubicación</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md  w-auto"
              type="text"
              name="venue"
              id="venue"
              value={eventData.venue}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="category">Categoría</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md  w-auto"
              type="text"
              name="category"
              id="category"
              value={eventData.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-2/4">
            <label htmlFor="price">Precio</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
              type="number"
              name="price"
              id="price"
              value={eventData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-2/4">
            <label htmlFor="date">Fecha del evento</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
              type="date"
              name="date"
              id="date"
              value={eventData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="description">Descripción</label>
            <br />
            <textarea
              className="bg-gray-700 border-solid h-24 border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-full"
              name="description"
              id="description"
              value={eventData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green text-dark px-2 text-xl font-semibold rounded-md"
          >
            CREAR EVENTO
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateEvent;

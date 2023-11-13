import axios from "axios";
import config from "../config.json";

//TRAER TODOS LOS EVENTOS
export async function fetchEvents() {
    const res = await axios.get(config.apiEvents);
    return res;
}

//CREAR UN EVENTO
// async function createEvent(data) {
//     try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Corregir la clave 'auth' a 'Authorization'
//         }
//       };
  
//       const eventData = {
//         name: data.name,
//         description: data.description,
//         price: data.price,
//         date: data.date,
//         category: data.category,
//         venue: data.venue,
//         state: "Publicado",
//         status: true,
//         userId: userId,
//       };
  
//       const response = await axios.post(config.apiEvents, eventData, config);
  
//       if (response.status === 200) {
//         const newEvent = response.data;
//         console.log("Evento creado exitosamente");
//         return newEvent;
//       } else {
//         throw new Error("Error al crear el evento");
//       }
//     } catch (error) {
//       throw new Error("Error al conectar con la API");
//     }
//   }
  
//   try {
//     const res = await axios.post(config.apiEvents, {});

//     if (res.status === 200) {
//       const newEvent = res.data;
//       console.log("Evento creado exitosamente");
//       return newEvent;
//     } else {
//       throw new Error("Error al crear el evento");
//     }
//   } catch (error) {
//     throw new Error("Error al conectar con la API");
//   }
// }

//   const res = await fetch("https://ventra-api-e311.onrender.com/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       auth: token,
//     },
//     body: JSON.stringify({
//       name: data.name,
//       description: data.description,
//       price: data.price,
//       date: data.date,
//       category: data.category,
//       venue: data.venue,
//       state: "Publicado",
//       status: true,
//       userId: userId,
//     }),
//   });

export async function createEvent(data) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const response = await fetch("https://ventra-api-e311.onrender.com/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description,
      price: data.price,
      date: data.date,
      category: data.category,
      venue: data.venue,
      state: "Publicado",
      status: true,
      userId: userId,
    }),
  });

  if (response.ok) {
    const newEvent = await response.json();
    console.log("Evento creado exitosamente");
    return newEvent;
  } else {
    console.log("Error al crear el evento");
    throw new Error("Error al crear el evento");
  }
}


//ELIMINAR UN EVENTO


// export async function deleteMyEvent (eventId){
//     const res = await axios.delete(config.apiEvents,eventId);
//     return res;
// }
// function deleteMyEvent(eventId, fetchMyEvents) {
//   // Realiza la solicitud de eliminación con el método DELETE
//   fetch(`https://ventra-api-e311.onrender.com/events/${eventId}`, {
//     method: "DELETE",
//   })
//     .then((response) => {
//       if (response.ok) {
//         // Eliminación exitosa, llama a la función para actualizar la lista de eventos
//         console.log("Evento eliminado");
//         fetchMyEvents();
//       } else {
//         console.log("Error al eliminar el evento");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       console.log("Error al conectarse a la API");
//     });
// }

// export default deleteMyEvent;


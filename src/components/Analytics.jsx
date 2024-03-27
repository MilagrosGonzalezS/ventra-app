import React, { useState, useEffect } from "react";
import { getAnalytics, getMyEvents } from "../index.js";
import Cookies from "js-cookie";

function Analytics() {
  const userId = Cookies.get("userId");
  console.log("userId", userId);

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [analyticsData, setAnalyticsData] = useState(null); // Definir analyticsData

  const getEvents = () => {
    getMyEvents(userId)
      .then((eventsData) => {
        setEvents(eventsData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAnalytics = async (eventId) => {
    try {
      const analyticsData = await getAnalytics(eventId);
      setAnalyticsData(analyticsData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchAnalytics(selectedEventId);
    }
  }, [selectedEventId]);

  const handleEventChange = (e) => {
    setSelectedEventId(e.target.value);
  };

  return (
    <section className="flex flex-col items-start mt-8">
      <div className="container mt-28 mx-auto px-4 sm:px-8">
        <select
          value={selectedEventId}
          onChange={handleEventChange}
          className="mb-4"
        >
          <option value="">Seleccionar evento</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
        {analyticsData && (
          <div className="w-full grid grid-cols-12 gap-10">
            <div className="col-span-6 bg-dark rounded-3xl h-fit py-4 px-8">
              <p>Nombre del evento: {analyticsData.name}</p>
              <p>Monto recaudado: ${analyticsData.totalAmount}</p>
            </div>
            <div className="col-span-6 bg-dark rounded-3xl h-fit py-4 px-8">
              <p>Entradas vendidas: {analyticsData.ticketsSold}</p>
              <p>Entradas disponibles: {analyticsData.ticketsAvailable}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export { Analytics };

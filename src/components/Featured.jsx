import { useState, useEffect } from "react";
import { getFeaturedEvents } from "../services/events/getEvents";
import { Link } from "react-router-dom";

function Featured() {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    try {
      getFeaturedEvents().then((res) => {
        setFeaturedEvents(res.data);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <section className="md:px-20 px-10 mb-12 -translate-y-16">
      <div className="grid grid-cols-12 gap-6">
        {featuredEvents &&
          featuredEvents.map((event, index) => (
            <div
              key={event._id}
              className={` ${
                index === 0
                  ? "col-span-7"
                  : index === 1
                  ? "col-span-5"
                  : "col-span-4"
              } text-white rounded-3xl h-52  cursor-pointer hover:translate-y-[-4px] hover:shadow-md transition-transform duration-400`}
            >
              <Link to={`/detalle/${event._id}`}>
                <img
                  src={`http://localhost/ventra-API/${event.cover}`}
                  alt="featured event"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}

export { Featured };

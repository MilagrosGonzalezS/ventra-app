import React from "react";
import event1 from "../assets/imgs/warhol.jpg";
import event2 from "../assets/imgs/duke.jpg";
import event3 from "../assets/imgs/bresh.jpeg";
import event4 from "../assets/imgs/afterlife.webp";
import event5 from "../assets/imgs/sideshows.png";

function Featured() {
  return (
    <section className="md:px-20 px-10 mb-12 -translate-y-16">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7 text-white rounded-3xl h-52">
          <img
            src={event1}
            alt="featured event"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-5 text-white h-52">
          <img
            src={event2}
            alt="featured event"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-4  text-white rounded-3xl h-52">
          <img
            src={event3}
            alt="featured event"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-4 text-white rounded-3xl h-52">
          <img
            src={event4}
            alt="featured event"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="col-span-4  text-white rounded-3xl h-52">
          <img
            src={event5}
            alt="featured event"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export { Featured };

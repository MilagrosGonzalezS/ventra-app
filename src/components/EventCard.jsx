import React from "react";
import PropTypes from "prop-types";
import image from "../assets/imgs/Duki-River.jpg";
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { addToWishlist } from "../index.js";

function EventCard(props) {
  const wishlistData = {
    eventId: props.id,
    eventName: props.name,
    eventVenue: props.venue,
    eventDate: props.date,
    eventTime: props.time,
    eventPrice: props.price,
    status: true,
  };

  const handleAddToWishlist = async () => {
    await addToWishlist(wishlistData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Card
        isFooterBlurred
        className="w-[350px] h-[250px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {props.category}
          </p>
          <h4 className="text-white/90 font-medium text-xl">{props.name}</h4>
          <button onClick={handleAddToWishlist}> ❤ </button>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={image}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 white:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/100">{props.venue}</p>
              <p className="text-tiny text-white/60">
                {props.date ? props.date.slice(0, 10) : ""}
              </p>
            </div>
            <p className="ml-4">${props.price}</p>
          </div>

          <Link
            to={`/comprar/${props.id}`}
            className="transition block text-center bg-green font-bold text-dark py-2 px-4 rounded-xl hover:bg-lime-600"
          >
            Comprar
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}

EventCard.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  venue: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  time: PropTypes.string,
};

export { EventCard };

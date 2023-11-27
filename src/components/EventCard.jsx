import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { addToWishlist, deleteFromWishlist } from "../index.js";
import { AuthContext } from "../context/AuthContext.jsx";

function EventCard(props) {
  const navigation = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { auth } = useContext(AuthContext);
  const token = auth;
  const wishlistData = {
    eventId: props.id,
    eventName: props.name,
    eventVenue: props.venue,
    eventDate: props.date,
    eventTime: props.time,
    eventPrice: props.price,
    status: true,
  };

  useEffect(() => {
    if (props.favorite) {
      setIsFavorite(true);
    }
  }, []);

  const handleDeleteFromWishlist = async () => {
    await deleteFromWishlist(props.id).then(() => {
      setIsFavorite(false);
    });
  };

  const handleAddToWishlist = async () => {
    await addToWishlist(wishlistData)
      .then((res) => {
        setIsFavorite(true);
        console.log(res);
      })
      .catch((error) => {
        console.log(error, "evento ya agregado");
      });
  };

  return (
    <>
      <Card
        isFooterBlurred
        className="w-[350px] h-[450px] col-span-12 sm:col-span-7 transition-transform duration-400 hover:shadow-md hover:transform hover:-translate-y-1"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold bg-dark py-2 px-4 rounded-full">
            {props.category}
          </p>
          {token ? (
            isFavorite ? (
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                onPress={handleDeleteFromWishlist}
              >
                No ♥
              </Button>
            ) : (
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                onPress={handleAddToWishlist}
              >
                ♥
              </Button>
            )
          ) : null}
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={`http://localhost/ventra-API/${props.cover}`}
        />
        <CardFooter className="absolute h-[100px] bg-black/40 bottom-0 z-10 border-t-1 border-default-600 white:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <h4 className="text-white/90 font-medium text-xl">
                {props.name}
              </h4>
              <p className="text-tiny text-white/100">{props.venue}</p>
              <p className="text-tiny text-white/60">
                {props.date ? props.date.slice(0, 10) : ""}
              </p>
            </div>
            <p className="ml-4">${props.price}</p>
          </div>

          {/* <Link
            to={`detalle/${props.id}`}
            className="transition block text-center bg-green font-bold text-dark py-2 px-4 rounded-xl hover:bg-lime-600"
          >
            Ver más
          </Link> */}
          <Button
            color="default"
            onPress={() => {
              navigation(`/detalle/${props.id}`);
            }}
            variant="faded"
          >
            Ver mas
          </Button>
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
  cover: PropTypes.string,
  favorite: PropTypes.bool,
};

export { EventCard };

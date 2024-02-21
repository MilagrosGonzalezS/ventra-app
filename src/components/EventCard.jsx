import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { addToWishlist, deleteFromWishlist } from "../index.js";
import { AuthContext } from "../context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
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
    eventCover: props.cover,
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
      toast("Quitado de favoritos", {
        icon: (
          <FontAwesomeIcon icon={faHeartBroken} style={{ color: "#c61022" }} />
        ),
        style: {
          background: "#232323",
          color: "#FCFCFC",
        },
      });
    });
  };

  const handleAddToWishlist = async () => {
    await addToWishlist(wishlistData)
      .then((res) => {
        setIsFavorite(true);
        toast("Agregado a favoritos", {
          icon: (
            <FontAwesomeIcon icon={fasFaHeart} style={{ color: "#c61022" }} />
          ),
          style: {
            background: "#232323",
            color: "#FCFCFC",
          },
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error, "evento ya agregado");
      });
  };

  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  return (
    <>
      <Card
        isFooterBlurred
        className="w-[273px] h-[350px] col-span-12 sm:col-span-3 transition-transform duration-400 hover:shadow-md hover:transform hover:-translate-y-1"
      >
        <CardHeader className="absolute z-10 top-1 flex items-center justify-end">
          {token ? (
            isFavorite ? (
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                onClick={handleDeleteFromWishlist}
              >
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={fasFaHeart}
                  style={{ color: "#fcfcfc", fontSize: "20px" }}
                />
              </Button>
            ) : (
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                onClick={handleAddToWishlist}
              >
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={farFaHeart}
                  style={{ color: "#FCFCFC", fontSize: "20px" }}
                />
              </Button>
            )
          ) : null}
        </CardHeader>
        <Image
          removeWrapper
          alt={props.name}
          className="z-0 w-full h-full object-cover"
          src={`http://localhost/ventra-API/${props.cover}`}
        />
        <CardFooter className="absolute h-[100px] bg-black/40 bottom-0 z-10 border-t-1 border-default-600 white:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <h4 className="text-white/90 font-medium text-xl truncate">
                {props.name}
              </h4>
              <p className="text-sm text-white/100 ">{props.venue}</p>
              <p className="text-xs text-white/60 ">{formatDate(props.date)}</p>
            </div>
          </div>

          <Button
            color="default"
            onPress={() => {
              navigation(`/detalle/${props.id}`);
            }}
            variant="faded"
          >
            Ver más
          </Button>
        </CardFooter>
      </Card>
      <Toaster position="center-center" />
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

import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyWishlist, EventCard } from "../../index.js";
import colors from "../../assets/imgs/recurso-colores.png";

function Wishlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMyWishlist()
      .then((wishlistData) => {
        setWishlist(wishlistData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className="flex flex-col items-start mt-8">
        <div className="">
          <div className="flex items-center gap-4">
            <div className="w-16">
              <img
                className="w-full"
                src={colors}
                alt="recurso gráfico de colores"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-accent">Favoritos</h2>
          </div>
          {isLoading ? (
            <PuffLoader
              className="absolute left-1/2 -translate-x-1/2 top-10"
              color="#04b290"
            />
          ) : (
            <div className="flex gap-4 justify-start flex-wrap mt-4">
              {wishlist.length === 0 ? (
                <p className="font-accent text-center">
                  Aún no tenés ningun evento favorito.
                </p>
              ) : (
                wishlist.map((item) => (
                  <article key={item._id}>
                    <EventCard
                      name={item.eventName}
                      category={item.eventCategory}
                      venue={item.eventVenue}
                      date={item.eventDate}
                      price={item.eventPrice}
                      id={item.eventId}
                      time={item.eventTime}
                      cover={item.eventCover}
                      favorite={true}
                    />
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export { Wishlist };

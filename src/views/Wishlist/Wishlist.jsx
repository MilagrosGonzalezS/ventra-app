import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyWishlist, EventCard } from "../../index.js";

function Wishlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMyWishlist()
      .then((wishlistData) => {
        console.log("wishlistData", wishlistData);
        setWishlist(wishlistData.data);
        console.log(wishlistData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <section className="min-h-screen flex-col items-center bg-pattern px-10 pt-12">
        <h1 className="font-accent text-3xl text-pink mb-8">
          Tus eventos favoritos
        </h1>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex gap-16 justify-center flex-wrap mt-4 pb-20">
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
      </section>
    </>
  );
}

export { Wishlist };

import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { getMyWishlist } from "../../index.js";

function Wishlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMyWishlist()
      .then((wishlistData) => {
        console.log(wishlistData);
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
      <section className="flex-col items-center">
        <h1 className="font-accent text-2xl text-center">Mis favoritos</h1>
        <h2 className="font-accent text-xl text-center">
          Acá podés encontrar la lista de tus eventos favoritos
        </h2>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex flex-col items-center gap-16 flex-wrap mt-16">
            {wishlist.length === 0 ? (
              <p className="font-accent text-center">
                Aún no tenés ningun evento favorito.
              </p>
            ) : (
              wishlist.map((wishlistItem) => (
                <article
                  key={wishlistItem._id}
                  className="w-2/5 bg-opacity rounded-xl border p-8"
                >
                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-xl ">
                      {wishlistItem.eventName}
                    </strong>
                    <div className="flex gap-2">
                      <p className="bg-green text-dark px-2 rounded-md">
                        {wishlistItem.eventTime}
                      </p>
                      <p className="bg-green text-dark px-2 rounded-md">
                        {wishlistItem.eventDate
                          ? wishlistItem.eventDate.slice(0, 10)
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="bg-pink px-2 rounded-md">
                      {wishlistItem.eventVenue}
                    </p>
                  </div>
                  <div className=" flex justify-between mb-4">
                    <p className="bg-green text-dark px-2 rounded-md">
                      $ {wishlistItem.eventPrice}
                    </p>
                  </div>
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

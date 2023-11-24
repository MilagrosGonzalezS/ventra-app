import {
  getEvents,
  getMyWishlist,
  Search,
  Filter,
  MyCard,
  EventCard,
} from "../../index.js";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Pagination,
  PaginationItem,
  PaginationCurso,
} from "@nextui-org/react";
import colors from "../../assets/imgs/recurso-colores.png";
import Cookies from "js-cookie";

function Home() {
  const [tokenExists, setTokenExists] = useState(false);
  const [events, setEvents] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setTokenExists(true);
    }
    getMyWishlist().then((res) => {
      setWishlist(res.data);
    });
    getEvents(2).then((res) => {
      setEvents(res.data);
    });
    setIsLoading(false);
  }, []);

  return (
    <main className="px-20 bodyBg bg-no-repeat">
      <section className="h-[90vh] flex flex-col justify-center">
        <div className="flex justify-center items-center gap-8 mb-28 mt-12">
          <div className="w-6/12 flex flex-col">
            <h1 className="font-accent text-[1.8rem] font-semibold">
              Organizá <span className="text-orange">eventos</span> únicos,
              vendé <span className="text-green">entradas</span> exclusivas y
              descubrí nuevas <span className="text-pink">experiencias</span>.
            </h1>
            <p className="text-base font-light text-white/60 mt-2">
              Fácil, rápido y sencillo.
            </p>
            <div className="flex gap-3 mt-5">
              <Button
                onPress={() => {
                  navigation("#events");
                }}
                className="bg-green text-dark font-medium"
              >
                Explorar eventos
              </Button>
              {!tokenExists && (
                <Button
                  onPress={() => {
                    navigation("/registrarse");
                  }}
                  color="default"
                  variant="faded"
                >
                  Crear cuenta
                </Button>
              )}
            </div>
          </div>
          <div className="w-6/12">
            <MyCard></MyCard>
          </div>
        </div>
        <div className="flex gap-3">
          <Search id="events" onSearchResultsUpdate={setSearchResults} />
          <Filter
            id="events"
            onSearchResultsUpdate={setSearchResults}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>

      {searchResults.length !== 0 && (
        <div className="flex items-center gap-4">
          <div className="w-16">
            <img
              className="w-full"
              src={colors}
              alt="recurso grafico de colores"
            />
          </div>
          <h2 className="text-2xl my-4 font-accent">{selectedCategory}</h2>
        </div>
      )}
      <section className="flex gap-16 justify-start flex-wrap my-4">
        {isLoading && (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        )}
        {searchResults.map((event) => {
          let isFavorite = false;
          if (
            wishlist.find(
              (wishlistEvent) => wishlistEvent.eventId === event._id
            )
          ) {
            isFavorite = true;
          }
          return (
            <EventCard
              key={event._id}
              name={event.name}
              category={event.category}
              venue={event.venue}
              date={event.date}
              price={event.price}
              id={event._id}
              time={event.time}
              cover={event.cover}
              favorite={isFavorite}
            />
          );
        })}
      </section>
      <div className="flex items-center gap-4">
        <div className="w-16">
          <img
            className="w-full"
            src={colors}
            alt="recurso grafico de colores"
          />
        </div>
        <h2 className="text-2xl my-4 font-accent">Más recientes</h2>
      </div>
      <section className="flex gap-16 justify-start flex-wrap mt-4">
        {isLoading && (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        )}
        {events.map((event) => {
          let isFavorite = false;
          if (
            wishlist.find(
              (wishlistEvent) => wishlistEvent.eventId === event._id
            )
          ) {
            isFavorite = true;
          }
          return (
            <EventCard
              key={event._id}
              name={event.name}
              category={event.category}
              venue={event.venue}
              date={event.date}
              price={event.price}
              id={event._id}
              time={event.time}
              cover={event.cover}
              favorite={isFavorite}
            />
          );
        })}
      </section>
      <Pagination isCompact showControls total={10} initialPage={1} />
    </main>
  );
}

export { Home };

import {
  getEvents,
  getAllEvents,
  getMyWishlist,
  Search,
  Filter,
  MyCard,
  EventCard,
} from "../../index.js";
import { useContext, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useNavigate, Link } from "react-router-dom";
import { Button, Pagination } from "@nextui-org/react";
import colors from "../../assets/imgs/recurso-colores.png";
import { AuthContext } from "../../context/AuthContext.jsx";
function Home() {
  const [tokenExists, setTokenExists] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsLength, setEventsLength] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState(null);
  // const [isResultsEmpty, setIsResultsEmpty] = useState(false);

  const navigation = useNavigate();
  const { auth } = useContext(AuthContext);
  const token = auth;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSearch("");
  };

  const handleSearchSelect = (search) => {
    setSelectedSearch(search);
    setSelectedCategory("");
  };

  function handlePageChange(pageNumber) {
    if (token) {
      getMyWishlist().then((res) => {
        setWishlist(res.data);
      });
    }
    getEvents(pageNumber).then((res) => {
      setEvents(res.data);
    });
  }
  const chevron = document.querySelector('[aria-label="dots element"]');
  if (chevron) {
    // Oculta el elemento cambiando su estilo
    chevron.style.display = "none";
  } else {
    console.error(
      'No se encontró ningún elemento con el atributo aria-label "dots element"'
    );
  }
  useEffect(() => {
    if (token) {
      setTokenExists(true);

      getMyWishlist().then((res) => {
        setWishlist(res.data);
      });
    }
    getEvents(1).then((res) => {
      setEvents(res.data);
    });
    getAllEvents().then((res) => {
      setEventsLength(res.data.events.length);
    });
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   if (searchResults.length == 0) {
  //     setIsResultsEmpty(true);
  //   } else {
  //     setIsResultsEmpty(false);
  //   }
  // }, [searchResults]);

  return (
    <main className="md:px-20 px-10 bodyBg bg-no-repeat">
      <section className="h-[90vh] flex flex-col justify-center">
        <div className="flex justify-center flex-col md:flex-row items-center gap-8 mb-5 md:mb-28 mt-20 md:mt-12">
          <div className="md:w-6/12  flex flex-col">
            <h1 className="font-accent text-[1.8rem] font-semibold">
              Organizá <span className="text-orange">eventos</span> únicos,
              vendé <span className="text-green">entradas</span> exclusivas y
              descubrí nuevas <span className="text-pink">experiencias</span>.
            </h1>
            <p className="text-base font-light text-white/60 mt-2">
              Fácil, rápido y sencillo.
            </p>
            <div className="flex gap-3 mt-5">
              <Button className="bg-green text-dark font-medium">
                <a href="#events">Explorar eventos</a>
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
          <div className="md:w-6/12">
            <MyCard></MyCard>
          </div>
        </div>
        <div className="flex gap-3" id="events">
          <Search
            onSearchResultsUpdate={setSearchResults}
            onSearchSelect={handleSearchSelect}
          />
          <Filter
            onSearchResultsUpdate={setSearchResults}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>
      {/* {isResultsEmpty && <p>No encontramos resultados</p>} */}
      {searchResults.length !== 0 && (
        <div className="flex items-center my-4 gap-4">
          <div className="w-16">
            <img
              className="w-full"
              src={colors}
              alt="recurso gráfico de colores"
            />
          </div>
          <h2 className="text-xl md:text-2xl my-4 font-accent">
            {selectedCategory && !selectedSearch
              ? `Categoría: ${selectedCategory}`
              : `Búsqueda: ${selectedSearch}`}
          </h2>
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
      <section className="flex gap-16 justify-center flex-wrap mt-4">
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
      <div className="w-fit mx-auto my-12">
        <Pagination
          isCompact
          color="secondary"
          showControls
          total={Math.ceil(eventsLength / 6)}
          initialPage={1}
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
}

export { Home };

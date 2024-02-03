import {
  getEvents,
  getAllEvents,
  getMyWishlist,
  Search,
  Filter,
  EventCard,
  Featured,
} from "../../index.js";
import banner from "../../assets/imgs/banner.png";
import video from "../../assets/videos/video.mp4";
import poster from "../../assets/imgs/portada.png";
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
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [isResultsEmpty, setIsResultsEmpty] = useState(false);

  const navigation = useNavigate();
  const { auth } = useContext(AuthContext);
  const token = auth;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSearch("");
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSelectedSearch("");
  };

  const handleSearchSelect = (search) => {
    setSelectedSearch(search);
    setSelectedCategory("");
    setSelectedZone("");
  };

  function resetFilter() {
    setSearchResults([]);
  }

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
  // }, [selectedCategory]);

  return (
    <main>
      <video
        id="background-video"
        autoPlay
        playsInline
        loop
        muted
        poster={poster}
      >
        <source src={video} type="video/mp4"></source>
      </video>
      <section className="absolute top-0 h-[75vh] min-h-screen flex flex-col justify-center w-full md:px-20 px-10 bg-opacity2">
        <div className="flex justify-center flex-col md:flex-row items-center">
          <div className="md:w-8/12  flex flex-col">
            <p className="text-base font-light text-white/60">
              Fácil, rápido y sencillo.
            </p>
            <h1 className="font-accent text-4xl font-semibold my-4 leading-normal">
              Organizá <span className="text-orange">eventos</span> únicos,
              <br></br>
              vendé <span className="text-green">entradas</span> exclusivas{" "}
              <br></br>y descubrí nuevas{" "}
              <span className="text-pink">experiencias.</span>
            </h1>

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
          <div className="md:w-6/12"></div>
        </div>
      </section>

      <Featured />

      <section className="grid grid-cols-12 gap-6 md:px-20 px-10">
        <div className="col-span-3">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 mt-3">
              <img
                className="w-full"
                src={colors}
                alt="recurso grafico de colores"
              />
            </div>
            <h2 className="text-2xl font-accent">Eventos</h2>
          </div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <p>Filtros</p>
            <button onClick={resetFilter}>Borrar filtro</button>
          </div>
          <Filter
            onSearchResultsUpdate={setSearchResults}
            onCategorySelect={handleCategorySelect}
            onZoneSelect={handleZoneSelect}
          />
        </div>
        <div className="col-span-9">
          <div className="flex gap-3" id="events">
            <Search
              onSearchResultsUpdate={setSearchResults}
              onSearchSelect={handleSearchSelect}
            />
          </div>
          {/* {isResultsEmpty && <p className="my-6">No encontramos resultados</p>} */}
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
          <section className="col-span-9 flex gap-8 justify-start flex-wrap my-8">
            {isLoading && (
              <PuffLoader
                className="absolute left-1/2 -translate-x-1/2 top-10"
                color="#04b290"
              />
            )}
            {searchResults.length !== 0
              ? searchResults.map((event) => {
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
                })
              : events.map((event) => {
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
        </div>
      </section>
      <div className="col-span-12">
        <img classname="w-full" src={banner} alt="banner" />
      </div>

      {/* {searchResults.length !== 0 && (
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
      </section> */}
      {/* <div className="flex items-center gap-4">
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
      </div> */}
    </main>
  );
}

export { Home };

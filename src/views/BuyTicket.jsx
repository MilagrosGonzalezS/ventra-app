import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../index.js";
import { PuffLoader } from "react-spinners";

function BuyTicket() {
  const { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const getEvent = () => {
      setIsLoading(true);
      getEventById(eventId)
        .then((res) => {
          setEvent(res.data[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
    getEvent();
  }, []);

  const ticketsPrice = event.price * amount;

  function handleSubstract() {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  }

  function handleAdd() {
    if (amount < 10) {
      setAmount(amount + 1);
    }
  }

  return (
    <>
      {isLoading ? (
        <PuffLoader
          className="absolute left-1/2 -translate-x-1/2 top-60"
          color="#04b290"
        />
      ) : (
        <section className="min-h-screen bg-opacity flex flex-col items-center justify-center">
          <Link to="/" className="hover:text-lightblue">
            Volver
          </Link>
          <article className="w-2/4 bg-dark mx-auto rounded-2xl border">
            <div className="flex gap-4 bg-opacity p-4 rounded-t-2xl">
              <h3 className="">{event.name}</h3>
              <p>{event.category}</p>
              <p>{event.date ? event.date.slice(0, 10) : ""}</p>
            </div>
            <div className="p-8">
              <h4>Seleccioná tu entrada</h4>
              <div className="flex items-center justify-between my-12 border border-lightblue rounded-2xl p-4">
                <p>Entrada General</p>
                <p>${event.price}</p>
                <div className="bg-opacity py-2 px-4 rounded-xl">
                  <p>Cantidad</p>
                  <div className="flex justify-evenly">
                    <button onClick={handleSubstract}>-</button>
                    <p>{amount}</p>
                    <button onClick={handleAdd}>+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-6 bg-opacity p-4 rounded-b-2xl">
              <h4>Total:</h4>
              <p>${ticketsPrice}</p>
              {amount > 0 && (
                <Link
                  to={`/comprar/${event._id}/checkout/${amount}`}
                  className="bg-lightblue py-2 px-4 rounded-xl hover:bg-emerald-600"
                >
                  Comprar
                </Link>
              )}
            </div>
          </article>
        </section>
      )}
    </>
  );
}

export { BuyTicket };

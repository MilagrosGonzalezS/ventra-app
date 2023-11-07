import React, { useState, useEffect } from "react";
import userData from "../../functions/userData";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
function MyAccount() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await userData();
      setUser(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-4xl my-4">Mi Cuenta</h1>
      {isLoading ? (
        <PuffLoader color="#04b290" />
      ) : (
        <div className="flex flex-col items-center text-xl">
          <p className="mb-2">
            <span className="underline underline-offset-4 decoration-green  me-4">
              Nombre:
            </span>
            {user.username}
          </p>
          <p className="mb-2">
            <span className="underline underline-offset-4 decoration-green  me-4">
              Email:
            </span>
            {user.email}
          </p>

          <button className="bg-pink mt-4 px-2 rounded-md">
            <Link to={`/mi-cuenta/${user.id}/editar-datos`}>
              Editar Mis Datos
            </Link>
          </button>
        </div>
      )}
    </>
  );
}

export default MyAccount;

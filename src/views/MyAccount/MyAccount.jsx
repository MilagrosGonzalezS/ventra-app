import { useState, useEffect } from "react";
import { userData } from "../../index.js";
import { PuffLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

function MyAccount() {
  const navigation = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const data = userData();
    data.then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-pattern px-10">
      <div className="text-center bg-opacity border p-6  rounded-xl w-[500px]">
        <h1 className="mb-3 font-accent text-xl text-green">Mi Cuenta</h1>
        <hr />
        {isLoading ? (
          <PuffLoader className="mt-10" color="#04b290" />
        ) : (
          <div className="text-start mt-4">
            <p className="mb-2 font-primary text-sm">
              <span className="me-2 font-accent text-base">Nombre:</span>
              {user.username}
            </p>
            <p className="mb-5 font-primary text-sm">
              <span className="me-2 font-accent text-base">Email:</span>
              {user.email}
            </p>
            <Button
              className="w-full bg-green text-dark"
              type="submit"
              onPress={() => {
                navigation(`/mi-cuenta/${user.id}/editar-datos`);
              }}
            >
              Editar Mis Datos
            </Button>
            {/* <button className="bg-pink mt-4 px-2 rounded-md w-full">
              <Link to={`/mi-cuenta/${user.id}/editar-datos`}>
                Editar Mis Datos
              </Link>
            </button> */}
          </div>
        )}
      </div>
    </main>
  );
}

export { MyAccount };

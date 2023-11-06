import React, { useState, useEffect } from "react";
import userData from "../../functions/userData";

function MyAccount() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await userData();
      setUser(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Mi Cuenta</h1>
      <div>
        <p>Nombre: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </>
  );
}

export default MyAccount;

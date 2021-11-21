import React, { useContext } from "react";

import { Context } from "../context/AuthContext";

const Cabecalho = () => {
  const { profile, handleLogout, redirect } = useContext(Context);

  return (
    <div className="cabecalho">
      <h3>Cadastro de vacinas</h3>
      {profile && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => redirect("/registro")}>Registro</button>
          <button onClick={() => redirect("/usuario")}>Seus dados</button>
        </>
      )}
      {profile === "admin" && (
        <>
          <button onClick={() => redirect("/perfil")}>Perfil</button>
          <button onClick={() => redirect("/vacina")}>Vacina</button>
        </>
      )}
    </div>
  );
};

export default Cabecalho;

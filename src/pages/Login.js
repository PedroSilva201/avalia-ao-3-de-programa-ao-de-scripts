import React, { useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { Context } from "../context/AuthContext";

export default function Login() {
  const { handleLogin } = useContext(Context);
  const [mail, setMail] = useState("maria@teste.com");
  const [senha, setSenha] = useState("123456");
  const submeter = (e) => {
    e.preventDefault();
    handleLogin(mail.trim(), senha.trim());
  };

  return (
    <div>
      <Cabecalho />
      <h4>Login </h4>
      <form onSubmit={submeter}>
        <div>
          <label>e-mail</label>
          <input value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
      <Rodape />
    </div>
  );
}

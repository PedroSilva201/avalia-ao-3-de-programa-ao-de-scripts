import React, { useEffect, useState, useContext } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import api from "../services/api";
import { Context } from "../context/AuthContext";

const Vacina = () => {
  const [idvacina, setIdvacina] = useState("");
  const [nome, setNome] = useState("");
  const [vacinas, setVacinas] = useState([]);
  const { setErrorMessage } = useContext(Context);

  useEffect(() => {
    //chamado ao carregar o componente
    (async () => {
      list();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = () => {
    api
      .get("/vacina/list")
      .then(({ data }) => {
        setErrorMessage("");
        setVacinas(data.vacinas);
      })
      .catch((e) => setErrorMessage(e.response.data.error[0]));
  };

  const save = (e) => {
    e.preventDefault();
    if (!idvacina) {
      api
        .post("/vacina/create", { nome: nome.trim() })
        .then(() => {
          reset(e);
          list();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    } else {
      api
        .put("/vacina/update", { idvacina, nome: nome.trim() })
        .then(() => {
          reset(e);
          list();
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error[0]);
        });
    }
  };

  const remove = (e, idvacina) => {
    e.preventDefault();
    api
      .delete("/vacina/remove", { data: { idvacina } })
      .then(() => {
        list();
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error[0]);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setIdvacina("");
    setNome("");
  };

  return (
    <div>
      <Cabecalho />
      <h4>Vacina</h4>
      <form>
        {idvacina && (
          <div>
            <label>ID: {idvacina}</label>
          </div>
        )}
        <div>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <button onClick={save}>Salvar</button>
          <button onClick={reset}>Limpar</button>
        </div>
      </form>
      {vacinas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {vacinas.map((item) => (
              <tr
                key={item.idvacina}
                onClick={() => {
                  setIdvacina(item.idvacina);
                  setNome(item.nome);
                }}
                onContextMenu={(e) => remove(e, item.idvacina)}
              >
                <td>{item.idvacina}</td>
                <td>{item.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Rodape />
    </div>
  );
};

export default Vacina;

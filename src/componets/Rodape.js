import React, { useContext } from "react";

import { Context } from "../context/AuthContext";

const Rodape = () => {
  const { errorMessage } = useContext(Context);

  return <h5>{errorMessage}</h5>;
};

export default Rodape;

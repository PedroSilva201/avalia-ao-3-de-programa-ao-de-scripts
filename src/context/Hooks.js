import { useState, useEffect } from "react";

import api from "../services/api";
import history from "../router/history";

export default function AuthHooks() {
  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const temp = JSON.parse(user);
      api.defaults.headers.Authorization = `Bearer ${temp.token}`;
      setProfile(temp.profile);
    }

    setIsLoading(false);
  }, []);

  async function handleLogin(mail, senha) {
    try {
      const {
        data: { token, perfil },
      } = await api.post("/usuario/login", { mail, senha });

      localStorage.setItem("user", JSON.stringify({ token, profile: perfil }));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setProfile(perfil);
      setErrorMessage("");
      history.push("/registro");
    } catch (e) {
      if (e.response.data.error) {
        setErrorMessage(e.response.data.error[0]);
      } else {
        setErrorMessage("Problemas para validar os dados");
      }
    }
  }

  function handleLogout() {
    setProfile("");
    localStorage.removeItem("user");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  function redirect(path) {
    history.push(path);
  }

  return {
    profile,
    isLoading,
    handleLogin,
    handleLogout,
    redirect,
    errorMessage,
    setErrorMessage,
  };
}

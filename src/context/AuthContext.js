import React, { createContext } from "react";

import AuthHooks from "./Hooks";

const Context = createContext();

function AuthProvider({ children }) {
  const {
    profile,
    isLoading,
    handleLogin,
    handleLogout,
    redirect,
    errorMessage,
    setErrorMessage,
  } = AuthHooks();
  return (
    <Context.Provider
      value={{
        profile,
        isLoading,
        handleLogin,
        handleLogout,
        redirect,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

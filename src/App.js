import React from "react";
import { Router } from "react-router-dom";
import "./App.css";

import Routes from "./router/routes";
import history from "./router/history";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;

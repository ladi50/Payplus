import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { AppContext } from "./context/context";

import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { useShifts } from "./hooks/useShifts";

const Table = lazy(() => import("./pages/Table/Table"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));

const App = () => {
  const { logout, login, token } = useAuth();
  const { getUserShifts, getUsers, shifts, users } = useShifts();

  const value = {
    token,
    logout,
    login,
    getUserShifts,
    getUsers,
    shifts,
    users
  };

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Table />
      </Route>
      <Route path="/user/:userId" exact>
        <Table />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Redirect to="/" exact>
        <Table />
      </Redirect>
    </Switch>
  );

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Table />
        </Route>
        <Route path="/user/:userId" exact>
          <Table />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" exact>
          <Table />
        </Redirect>
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <AppContext.Provider value={value}>
        <Suspense fallback="loading...">{routes}</Suspense>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;

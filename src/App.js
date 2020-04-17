import React from "react";
import { Login } from "./Componets/Login.js";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import { EmailChecker } from "./Componets/EmailChecker";
import { getToken, isTokenNotExpired } from "./utils/userUtils";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Course Email Checker </Typography>
          </Toolbar>
        </AppBar>
        <div className="Switch">
          <Switch>
            <Route path={"/login"}>
              <Login />
            </Route>
            <PrivateRoute component={EmailChecker} path={"/"} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

function PrivateRoute({ component: Component, ...rest }) {
  const token = getToken();
  const isTokenValid = isTokenNotExpired(token);
  return (
    <Route
      {...rest}
      render={(props) =>
        isTokenValid ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Destination from './components/Destination/Destination';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const LoggedInUserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser.name);
  return (
    <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1>Name: {loggedInUser.name} </h1>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/destination">
            <Destination></Destination>
          </PrivateRoute>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <h1>Name: {loggedInUser.name} </h1>
    </LoggedInUserContext.Provider>
  );
}

export default App;

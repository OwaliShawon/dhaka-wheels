import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';

export const LoggedInUserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    isSignIn: false
  });
  console.log(loggedInUser);
  return (
    <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      <Router>
        <h1>Name: {loggedInUser.name} </h1>
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



          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </LoggedInUserContext.Provider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import CreateTak from "./pages/CreateTak";
import MainBoard from "./pages/MainBoard";
import NoMatch from "./pages/NoMatch";
import Nav from './components/Nav';
import CreateUser from "./pages/CreateUser";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/createUser" component={CreateUser} />
        <Route exact path="/mainBoard" component={MainBoard} />
        <Route exact path="/createTak" component={CreateTak} />
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>;


export default App;

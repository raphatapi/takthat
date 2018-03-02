<<<<<<< HEAD
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

=======
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Login from './Login';

class App extends Component {

  state = {
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="App">
        <Form onChange={fields => this.onChange(fields)} />
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>

      


      </div>
    );
  }
}
>>>>>>> ad14d84b18678460d3a22174ac87ce67bade48bc

export default App;

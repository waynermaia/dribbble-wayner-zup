import React, { Component } from 'react';
import Dribbble from './components/RequestApiDribbble';
import logo from './dribbbleLogo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Welcome to my Dribbble Client</h5>
        </div>
          <Dribbble />
      </div>
    );
  }
}

export default App;
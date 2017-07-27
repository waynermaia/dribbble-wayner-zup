import React, { Component } from 'react';
import Dribbble from './components/RequestApiDribbble';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Welcome to React</h5>
        </div>
        <p className="App-intro">
        </p>
          <Dribbble />
      </div>
    );
  }
}

export default App;

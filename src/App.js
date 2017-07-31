import React, { Component } from 'react';
import NavBar from './components/AppBar';
import Dribbble from './components/RequestApiDribbble';
import logo from './dribbbleLogo.svg';
import './App.css';
import './PlayerGif.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Web application for Front end Developer test</h5>
        </div>
          <Dribbble />
      </div>
    );
  }
}

export default App;
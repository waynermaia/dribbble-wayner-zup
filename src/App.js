import React, { Component } from 'react';
import NavBar from './components/AppBar';
import Dribbble from './components/RequestApiDribbble';
import logo from './dribbbleLogo.svg';
import './App.css';
import './PlayerGif.css';
import ScrollToTop from 'react-scroll-up';
import ArrowUpward from 'material-ui-icons/ArrowUpward';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Web application for Front end Developer test</h5>
        </div>
        <div className="App-content">
          <Dribbble />
          <ScrollToTop showUnder={160}>
            <ArrowUpward className="ArrowUpward" />
          </ScrollToTop>
        </div>
      </div>
    );
  }
}

export default App;
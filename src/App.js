import React, { Component } from 'react';
import NavBar from './components/AppBar';
import ListShots from './components/ListShots';
import logo from './dribbbleLogo.svg';
import './App.css';
import './PlayerGif.css';
import ScrollToTop from 'react-scroll-up';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import SearchShot from './components/SearchShot'

class App extends Component {
  render() {
    return (

      <div className="App">

        <NavBar />

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Web application for Front end Developer test</h5>
          <SearchShot />
        </div>

        <div className="App-content">
          <ListShots list="any" timeframe="now" sort="popularity"/>
        </div>

        <ScrollToTop showUnder={160}>
          <ArrowUpward className="ArrowUpward" />
        </ScrollToTop>

      </div>

    );
  }
}

export default App;
import React, { Component } from 'react';
import NavBar from './components/AppBar';
import ListShots from './components/ListShots';
import logo from './dribbbleLogo.svg';
import './App.css';
import './PlayerGif.css';
import ScrollToTop from 'react-scroll-up';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import SearchShot from './components/SearchShot';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import ViewModuleIcon from 'material-ui-icons/ViewModule';

const styleSheet = createStyleSheet(theme => ({
  root: {
    position: "absolute",
    maxWidth: 200,
    top: -16
  },
}));

const options = [
  'Small with title',
  'Small with description',
  'Small with likes',
  'Small without info',
];

class App extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 3,
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
        const classes = this.props.classes;

    return (

      <div className="App">

        <NavBar />

        <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={<ViewModuleIcon />}
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={<ViewModuleIcon />}
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) =>
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>,
          )}
        </Menu>
      </div>

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Web application for Front end Developer test</h5>
          
          <SearchShot />

        </div>

        <div className="App-content">
          <ListShots
          CardHeader={
            this.state.selectedIndex == 0? true : false 
          }
          CardContent={
            this.state.selectedIndex == 1? true : false 
          }
          CardActions={
            this.state.selectedIndex == 2? true : false 
          }/>
        </div>

        <ScrollToTop showUnder={160}>
          <ArrowUpward className="ArrowUpward" />
        </ScrollToTop>

      </div>

    );
  }
}
export default withStyles(styleSheet)(App);
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import ViewModuleIcon from 'material-ui-icons/ViewModule';

const styleSheet = createStyleSheet(theme => ({
  root: {
    width: '100%',
    maxWidth: 200,
    background: "#ff4081",
  },
}));

const options = [
  'Small with info',
  'Large with info',
  'Small without info',
  'Large without info',
];

class SizeShots extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 1,
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
              {option} {this.state.selectedIndex}
            </MenuItem>,
          )}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styleSheet)(SizeShots);
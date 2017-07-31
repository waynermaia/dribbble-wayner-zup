import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

export default class NavBar extends Component {
	render(){
		return(
			<AppBar color="accent" position="static">
		        <Toolbar>
		          <IconButton color="contrast" aria-label="Menu">
		            <MenuIcon />
		          </IconButton>
		          <Typography type="title" color="inherit" style={{flex:1}}>
		          </Typography>
		          <Button color="contrast" className="right">Login</Button>
		        </Toolbar>
		    </AppBar>
		);
	}
}

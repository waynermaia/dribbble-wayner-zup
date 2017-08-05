import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import GitHub from '../GitHub.svg';
import SearchShot from './SearchShot'
import Menu from 'material-ui-icons/Menu';

export default class NavBar extends Component {
	render(){
		return(
			<AppBar color="accent" position="static">
		        
		        <Toolbar>

		          <Typography type="title" color="inherit" style={{flex:1}}>
			          
		          </Typography>

		          <IconButton color="contrast" className="right">
					<a href="https://github.com/waynermaia/dribbble-wayner-zup" target="blank">
						<img src={GitHub} style={{width:30}} title="GitHub" alt="GitHub" />
					</a>
		          </IconButton>
		          
		        </Toolbar>

		    </AppBar>
		);
	}
}

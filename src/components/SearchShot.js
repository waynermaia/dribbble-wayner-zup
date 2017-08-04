import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import Input from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui-icons/Search';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';

const url = "https://dribbble.com/search/?q=";

const ListShots = (props) => {
  return  <div>
  <img 
  style={{cursor:"pointer",padding:2,borderRadius:4,margin:20}}
  src={props.img}
  id={props.id}
  />
  </div>
}

const styleSheet = createStyleSheet(theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  corsLink: {
    color: "#ffffff"
  }
}));


class SearchShot extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      shots : {
        img: [],
        id: []
      },
      search: "",
      result: false,
      error:  false,
      open:   false
    }
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      search: event.target.value
    }, function() {
      this.performSearch();
    });
  };

  performSearch() {
    const urlQuery = url + this.state.search;

    if(this.state.search !== '') {
      axios.get(urlQuery)
      .then(result => {

        let arrayShots = ReactHtmlParser(result.data)[1]
        .props.children[1]
        .props.children[5]
        .props.children[2]
        .props.children[0]
        .props.children[1]
        .props.children[0]
        .props.children;

        let arrayShotsLenght = arrayShots[0].props.children[0].props.children.length

        let shots = {
          img: [],
          id: []
        }

        for (let i = 0; i < arrayShotsLenght; i++){
          shots['img'].push(arrayShots[i].props.children["0"].props.children["0"].props.children["0"].props.children["0"].props.children["0"].props.children[1].props.srcSet);
          shots['id'].push(arrayShots["0"].props.id.slice(11, 18));
        }
        this.setState({
          shots:   shots,
          loading: false,
          result:  false
        });
      })
      .catch(err=>{
        this.setState({
          error: true,
          loading: false,
          result:  false
        })
      });
    }else{
      this.setState({
        shots: {
          img: [],
          id: []
        }
      })
    }
  }

  render() {

    const { shots, error, result } = this.state;
    const { classes } = this.props;

    return <Grid item xs>{
      !error
      ?<div>
      <Input id="name" style={{top:-25,left:35,color:'#ffffff'}} placeholder="Search a shot" onChange={this.handleChange} />
      <IconButton style={{top:-15,color:'#ffffff'}} aria-label="SearchShot">
      <Search />
      </IconButton>
      <Grid container justify="center" gutter={24}>
      {Object.keys(shots.img).map((shot,val)=>
        <Grid item>
        <ListShots img={shots.img[val]} id={shots.id[val]}/>
        </Grid>
        )}
      </Grid>
      </div>
      :<div>
      <Input id="name" style={{top:-25,left:35,color:'#ffffff'}} placeholder="Search a shot" onChange={this.handleClick} />
      <IconButton style={{top:-15,color:'#ffffff'}} aria-label="SearchShot">
      <Search />
      </IconButton>
        <div>
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6e3}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Enable CORS and refresh!</span>}
          action={[
            <Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
              <a className={classes.corsLink} href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi" target="blank">
                Download
              </a>
            </Button>,
            <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleRequestClose}
            >
            <CloseIcon />
            </IconButton>,
            ]}
            />
          </div>
        </div>
      }</Grid>
    }
  }

export default withStyles(styleSheet)(SearchShot);
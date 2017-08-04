import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import CardShot from './CardShot';

import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

const url = "https://api.dribbble.com/v1/shots?";
const access_token = "cb450965189dff95f12907dea450c4b155e3fda4a72ae57af138bbba773ad1bd";

export default class ListShots extends Component {
  constructor(props) {

    super(props)
    
    this.state = {
      shots:       [],
      result:      false,
      loading:     true,
      refApi:{
        list:      "any",
        timeframe: "now",
        sort:      "popularity"
      },
      per_page:    30,
      gutter:      24,
      error:       false
    };
  }

  componentWillMount(props) {

    const { list, timeframe, sort } = this.props;
    const { per_page } = this.state;

    axios.get("https://dribbble.com/search/?q=teste")
    .then(result => {
      this.setState({
        shots:   result.data,
        loading: false,
        result:  true
      });
    })
    .catch(err=>{
      this.setState({
        error: true,
        loading: false,
        result:  false
      })
    });
  }

  render() {

    const { shots, loading, gutter, error, result } = this.state;

    if(loading){
      return <LinearProgress color="accent" />
    }

    else if (result) {
      return <div> {
        <p>{console.log(
            ReactHtmlParser(shots)[1].props.children[1].props.children[5].props.children[2].props.children["0"].props.children[1].props.children["0"].props.children
          )}</p>
      }
      </div>
    }

    else if(error){
      return (<p style={{textAlign:'center'}}>Ocorreu algum erro</p>);
    }

  }
}
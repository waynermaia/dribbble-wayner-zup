import React, { Component } from 'react';
import axios from 'axios';

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

    axios.get(`${url}&list=${list}&timeframe=${timeframe}&sort=${sort}&per_page=${per_page}&access_token=${access_token}`)
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
      return <Grid item xs> {
        <Grid container justify="center" gutter={gutter} className="ListShots">
        { shots.map(shot =>
          <Grid key={shot.id} item>
          <CardShot
          id={shot.id}
          animated={shot.animated}
          gif={shot.images.hidpi}
          img={shot.images.normal}
          alt={shot.title}
          title={shot.title}
          description={""}
          username={shot.user.username}
          avatar={shot.user.avatar_url}
          owner={shot.user.name}
          date={shot.created_at}
          likes_count={shot.likes_count}
          views_count={shot.views_count}
          comments_count={shot.comments_count}
          />
          </Grid>,
          )}
        </Grid>
      }
      </Grid>
    }

    else if(error){
      return (<p style={{textAlign:'center'}}>Disable CORS for render list of Shots</p>);
    }

  }
}
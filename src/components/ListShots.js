import React, { Component } from 'react';
import axios from 'axios';

import CardShot from './CardShot';

import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

const url = "https://api.dribbble.com/v1/shots?";
const access_token = "32f6310e856d9e7ce2245fc5c609d6b273e6920c77489b3c3cdd018e271b3bcd";

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
        <Grid container justify="center" gutter={gutter}>
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
      return (<p style={{textAlign:'center'}}>Something went wrong</p>);
    }

  }
}
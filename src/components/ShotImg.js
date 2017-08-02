import React, { Component } from 'react';
import axios from 'axios';

import CardShot from './CardShot';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const url = "https://api.dribbble.com/v1/shots?";
const access_token = "32f6310e856d9e7ce2245fc5c609d6b273e6920c77489b3c3cdd018e271b3bcd";

const filter = () => {
    return <p>teste</p>
}

export default class ShotDribbble extends Component {
  constructor(props) {

    super(props)
    
    this.state = {
      shots:       [],
      loading:     true,
      refApi:{
        list:      "any",
        timeframe: "now",
        sort:      "popularity"
      },
      per_page:    10,
      gutter:      24,
    };
  }

  componentDidMount() {
    const { refApi, per_page } = this.state;
    axios.get(`${url}&list=${refApi.list}&timeframe=${refApi.timeframe}&sort=${refApi.sort}&per_page=${per_page}&access_token=${access_token}`)    .then(result => {
      this.setState({
        shots: result.data
      })
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {

    const classes = this.props.classes;
    const { shots } = this.state;

    return (
      <div>
      {shots.map(shot => (
        <CardShot
          id={shot.id}
          animated={shot.animated}
          gif={shot.images.hidpi}
          img={shot.images.normal}
          alt={shot.title}
          title={shot.title}
          description={shot.description}
          username={shot.user.username}
          avatar={shot.user.avatar_url}
          owner={shot.user.name}
          date={shot.created_at}
          likes_count={shot.likes_count}
          views_count={shot.views_count}
          comments_count={shot.comments_count}
        />
        )
      )
    }
    </div>
    );
  }

}
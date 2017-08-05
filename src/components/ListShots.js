import React, { Component } from 'react';
import axios from 'axios';

import CardShot from './CardShot';

import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ViewsIcon from 'material-ui-icons/Visibility';
import CommentsIcon from 'material-ui-icons/Comment';
import Divider from 'material-ui/Divider';

const url = "https://api.dribbble.com/v1/shots?";
const access_token = "cb450965189dff95f12907dea450c4b155e3fda4a72ae57af138bbba773ad1bd";

export default class ListShots extends Component {
  constructor(props) {

    super(props)

    this.state = {
      shots:       [],
      result:      false,
      loading:     true,
      sort:      "popularity",
      per_page:    30,
      gutter:      24,
      error:       false,
      value:       0,
      CardHeader:  true
    };
  }

  handleChange = (event, value) => {

    let sort;

    if(value == 0){
      sort = "popularity";
    }
    else if(value == 1){
      sort = "recent";
    }
    else if(value == 2){
      sort = "views";
    }
    else if(value == 3){
      sort = "comments";
    }

    this.setState({
      value,
      sort,
      loading: true
    });

    this.componentWillMount(sort)
  };

  componentWillMount(props) {

    let sort = props;

    const { per_page, list, timeframe } = this.state;

    axios.get(`${url}&sort=${sort}&per_page=${per_page}&access_token=${access_token}`)
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

    const { shots, loading, gutter, error, result, value } = this.state;

    if(loading){
      return <LinearProgress color="accent" />
    }

    else if (result) {
      return <Grid item xs> 
      <BottomNavigation value={value} onChange={this.handleChange}>
      <BottomNavigationButton label="Popular" icon={<FavoriteIcon />} />
      <BottomNavigationButton label="Recent" icon={<RestoreIcon />} />
      <BottomNavigationButton label="Most viewed" icon={<ViewsIcon />} />
      <BottomNavigationButton label="Most commented" icon={<CommentsIcon />} />
      </BottomNavigation>
      
      <Divider light />

      <Grid container justify="center" gutter={gutter} className="ListShots">
      { shots.map(shot =>
        <Grid key={shot.id} item>
        <CardShot
        CardHeader={this.props.CardHeader}
        CardContent={this.props.CardContent}
        CardActions={this.props.CardActions}
        id={shot.id}
        animated={shot.animated}
        avatar={shot.user.avatar_url}
        owner={shot.user.name}
        username={shot.user.username}
        date={shot.created_at}
        gif={shot.images.hidpi}
        img={shot.images.normal}
        alt={shot.title}
        title={shot.title}
        description={shot.description}
        likes_count={shot.likes_count}
        views_count={shot.views_count}
        comments_count={shot.comments_count}
        />
        </Grid>,
        )}
      </Grid>      
      </Grid>
    }

    else if(error){
      return (<p style={{textAlign:'center'}}>Disable CORS for render list of Shots</p>);
    }

  }
}
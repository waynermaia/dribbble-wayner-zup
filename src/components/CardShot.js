import React from 'react';
import Card, {CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import LazyLoad from 'react-lazy-load';
import GifPlayer from 'react-gif-player';
import DateFormat from 'dateformat';
import Avatar from 'material-ui/Avatar';

import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Likes from 'material-ui-icons/Favorite';
import Views from 'material-ui-icons/Visibility';
import Comment from 'material-ui-icons/Comment';


const styleSheet = createStyleSheet('ListOfShots', theme => ({
  card: {
    maxWidth: 290,
    cursor: 'pointer',
  },
  avatarPic: {
    width: 40,
    borderRadius: 20,
  },
  backgroundCard: {
    width: '100%',
    transition: '.4s opacity',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    overflow: 'auto',
    height: 200
  }
}));

function CardShot(props) {

  const classes = props.classes;

  return (
    <Card className={classes.card}>
      {
      props.CardHeader ?
      <CardHeader
      avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
             <img src={props.avatar} className={classes.avatarPic} alt={props.username}/>
          </Avatar>
      }
        title={props.owner}
        subheader={DateFormat(props.date,"fullDate")}
      />
      :null
      }

      <CardMedia>
        <LazyLoad
            height={216}
            key={props.id}
            throttle={0}>
            {
            	props.animated
            	?<GifPlayer className={classes.backgroundCard} gif={props.gif} still={props.img} alt={`shot-${props.id}`} />
				      :<img className={classes.backgroundCard} src={props.img} alt={`shot-${props.id}`} />
            }
        </LazyLoad>
      </CardMedia>

      {props.CardContent ? 
      <CardContent>
        <Typography className={classes.title}>
          {props.title}
        </Typography>
        <Typography className={classes.description} component="small">
          <div dangerouslySetInnerHTML={{__html: props.description}} />
        </Typography>
      </CardContent>
      :null
      }
      
      <Divider light />
      {props.CardActions ?

      <CardActions disableActionSpacing>
        <IconButton aria-label="Likes">
        <Likes />
        </IconButton>
        {props.likes_count}

        <IconButton aria-label="Views">
        <Views />
        </IconButton>
        {props.views_count}

        <IconButton aria-label="Views">
        <Comment />
        </IconButton>
        {props.comments_count}
        <div className={classes.flexGrow} />
      </CardActions>
      :null
      }

    </Card>
  );
}

export default withStyles(styleSheet)(CardShot);
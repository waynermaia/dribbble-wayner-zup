import React from 'react';
import Card, {CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import LazyLoad from 'react-lazy-load';
import GifPlayer from 'react-gif-player';
import renderHTML from 'react-render-html';
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
  }
}));

function CardShot(props) {

  const classes = props.classes;

  return (
    <Card className={classes.card}>
        
	  	<CardHeader
    	avatar={
        	<Avatar aria-label="Recipe" className={classes.avatar}>
        		<img src={props.avatar} className={classes.avatarPic} alt={props.username}/>
			</Avatar>
    	}
	      title={props.owner}
	      subheader={DateFormat(props.date,"fullDate")}
	    />

      <CardMedia>
        <LazyLoad
            key={props.id}
            throttle={0}>
            {
            	props.animated
            	?<GifPlayer className={classes.backgroundCard} gif={props.gif} still={props.img} alt={`shot-${props.id}`} />
				      :<img className={classes.backgroundCard} src={props.img} alt={`shot-${props.id}`} />
            }
        </LazyLoad>
      </CardMedia>

      <CardContent>
        <Typography component="h5">
          {props.title}
        </Typography>
        <Typography component="small">
          {renderHTML(props.description)}
        </Typography>
      </CardContent>

      <Divider light />

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

    </Card>
  );
}

export default withStyles(styleSheet)(CardShot);
import React, { Component } from 'react';
import Request from 'react-http-request';

import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, {CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

// import renderHTML from 'react-render-html';

const access_token = "32f6310e856d9e7ce2245fc5c609d6b273e6920c77489b3c3cdd018e271b3bcd";

const Teste = () =>(<p>Teste</p>)

class ListOfShots extends Component {
  
  state = {
    gutter: '24',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render(){
    
    const classes = this.props.classes;
    const { gutter } = this.state;

    return (
          <Request
          url={'https://api.dribbble.com/v1/shots?&access_token=' + access_token}
          method='get'
          accept='application/json'
          verbose={true}
          >
          {
            ({error, result, loading}) => {
              if (loading) {
                return (
                <div className={classes.parentProgress}>
                  <CircularProgress color="accent" className={classes.progress} size={50} />
                </div>
                );
              } else if(result) {
                return <div>{

              <Grid item xs={12}>
                <Grid container style={{}} className={classes.demo} justify="center" gutter={Number(gutter)}>
                  {result.body.map(shot =>

                    <Grid key={shot.id} item>

                      <Card className={classes.card}>

                        <CardHeader
                          avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                              <img src={shot.user.avatar_url} className={classes.avatarPic} alt={shot.user.username}/>
                            </Avatar>
                          }
                          title={shot.user.name}
                          subheader={shot.created_at}
                        />

                        <CardMedia>
                          <img width="100%" className={classes.backgroundCard} src={shot.images.hidpi ? shot.images.hidpi : shot.images.normal} alt="Contemplative Reptile" />
                        </CardMedia>

                        <CardContent>
                          <Typography className={classes.cardTitle} type="headline" component="h1">
                            {shot.title}
                          </Typography>
                        </CardContent>

                        <Divider light />

                        <CardActions>
                          <Button dense color="primary">
                          Ver Mais
                          </Button>
                        </CardActions>

                      </Card>

                     </Grid>,
                    )}
                  </Grid>
                </Grid>            
              }
              </div>;
            }else{
              return (<p>Ocorreu algum Erro.</p>);
            }
          }
        }
        </Request>
    );
  }
}

ListOfShots.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styleSheet = createStyleSheet('ListOfShots', theme => ({
  card: {
    maxWidth: 345,
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: 18,
  },
  avatarPic: {
    width: 40,
    borderRadius: 20,
  },
  backgroundCard: {
    transition: '.4s opacity',
    '&:hover': {
      opacity: '.4',
      transition: '.4s opacity',
    },
  },
  demo: {
    backgroundColor:'#f4f4f4',
    width:'initial',
    margin:'initial'
  },
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  parentProgress: {
    display: 'flex',
    height: 100 
  },
  progress: {
    margin: 'auto',
  },
}));

export default withStyles(styleSheet)(ListOfShots);
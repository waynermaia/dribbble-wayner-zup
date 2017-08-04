import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import Input from 'material-ui/Input';

const url = "https://dribbble.com/search/?q=";

const ListShots = (props) => {
  return  <div>
  <img 
  style={{cursor:"pointer"}}
  src={props.img}
  id={props.id}
  />
  </div>
}

class SearchShot extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      shots : {
        img: [],
        id: []
      },
      search : ""
    }
  }

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

    const {shots} = this.state;

    return (
      <div>
      <Input id="name" placeholder="Search shot" onChange={this.handleChange} />

      {Object.keys(shots.img).map((shot,val)=>
        <ListShots img={shots.img[val]} id={shots.id[val]}/>
        )}
      </div>
      )
  }
}

export default SearchShot;
import React, { Component } from 'react';
import axios from 'axios';

const url = "https://api.dribbble.com/v1/shots?";
const access_token = "32f6310e856d9e7ce2245fc5c609d6b273e6920c77489b3c3cdd018e271b3bcd";

class AxiosDribbble extends Component {
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
      per_page:    10

    };
  }

  componentDidMount() {
    const { refApi, per_page } = this.state;
    axios.get(`${url}&list=${refApi.list}&timeframe=${refApi.timeframe}&sort=${refApi.sort}&per_page=${per_page}&access_token=${access_token}`).then(result => {
      this.setState({
        shots: result.data,
        loading: false
      })
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
      {this.state.shots.map(shot => (
        <img key={shot.id}src={shot.images.normal}/>
        )
      )
    }
    </div>
    );
  }

}
export default AxiosDribbble
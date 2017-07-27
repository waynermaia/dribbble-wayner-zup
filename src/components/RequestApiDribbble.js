import React, { Component } from 'react';
import Request from 'react-http-request';
import Load from './../dribbbleLogo.svg';

const access_token = "32f6310e856d9e7ce2245fc5c609d6b273e6920c77489b3c3cdd018e271b3bcd";

export default class Dribbble extends Component {
  render() {
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
            return <img src={Load} className="App-logo" alt="load Dribbble" />;
          } else {
            return <div>{ result.body.map((shots)=>{
              return (<div>
                <p>
                {shots.id}
                </p>
                </div>)
            })
          }
          </div>;
        }
      }
    }
    </Request>
    );
  }
}
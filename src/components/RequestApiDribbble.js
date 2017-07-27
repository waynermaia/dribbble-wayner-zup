import React, { Component } from 'react';
import Request from 'react-http-request';
import Load from './../dribbbleLogo.svg';
import {Col,Button, Modal, Icon, Row, Card, CardTitle} from 'react-materialize'

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
            return <Row>{ result.body.map((shot)=>{
              return (<div>
                  <Col s={3} m={3}>
                    <Card header={<CardTitle reveal image={shot.images.hidpi} waves='light'/>}
                    title={shot.title}
                    reveal={<p>shot.description</p>}>
                    <p>
                      <Modal
                      header={shot.title}
                      trigger={<Button waves='light'>OR ME!<Icon right>insert_chart</Icon></Button>}>
                      {shot.description}
                      </Modal>
                    </p>
                    </Card>
                  </Col>
                </div>)
            })
          }
          </Row>;
        }
      }
    }
    </Request>
    );
  }
}
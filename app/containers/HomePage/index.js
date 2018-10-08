import React from 'react';
import axios from 'axios';

import { Helmet } from 'react-helmet';
import Button from 'components/Button';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Offline Mails Grabber</title>
        </Helmet>
        <div>
          <p>Hello World</p>
          <p>How are you?</p>
          <Button onClick={this.onVerifyClick}>
            Click Here to verify your mail id
          </Button>
        </div>
      </article>
    );
  }

  onVerifyClick = () => {
    axios({
      url: 'http://localhost:3000/send',
      method: 'post',
      data: {
        host: 'http://localhost:3000',
        to: '201401009@daiict.ac.in',
      },
    }).then(data => {
      if (data === 'sent') {
        console.log('email has been sent');
      }
    });
  };
}

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
          <Button onClick={this.onGoogleClick}>
            Click Here to verify your mail id
          </Button>
        </div>
      </article>
    );
  }

  onGoogleClick = () => {
    axios({
      url: 'http://localhost:3000/google/auth',
      method: 'get',
    }).then(url => {
      window.open(url.data, '_self');
    });
  };
}

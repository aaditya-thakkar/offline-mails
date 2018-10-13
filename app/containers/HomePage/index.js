import React from 'react';
import axios from 'axios';

import { Helmet } from 'react-helmet';
import Button from 'components/Button';
import Input from 'components/Input';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
    };
  }

  onGoogleClick = () => {
    axios({
      url: 'http://localhost:3000/google/auth',
      method: 'get',
    }).then(url => {
      window.open(url.data, '_self');
    });
  };

  render() {
    return (
      <article>
        <Helmet>
          <title>Offline Mails Grabber</title>
        </Helmet>
        <div>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={this.state.emailAddress}
            onChange={this.onChangeEmailValue}
          />
          <Button onClick={this.onVerifyClick}>
            Click Here to verify your mail id
          </Button>
          <Button onClick={this.onGoogleClick}>
            Click Here to verify your mail id
          </Button>
        </div>
      </article>
    );
  }

  onChangeEmailValue = event => {
    this.setState({
      emailAddress: event.target.value,
    });
  };

  onVerifyClick = () => {
    axios({
      url: 'http://localhost:3000/send',
      method: 'post',
      data: {
        host: 'http://localhost:3000',
        to: this.state.emailAddress,
      },
    }).then(data => {
      if (data === 'sent') {
        console.log('email has been sent');
      }
    });
  };
}

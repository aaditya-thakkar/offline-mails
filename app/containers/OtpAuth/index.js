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
      email: '',
      name: '',
      phoneNumber: '',
    };
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Offline Mails Grabber</title>
        </Helmet>
        <div>
          <text>Enter your name</text>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={this.onChangeNameValue}
          />
          <text>Enter your email</text>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={this.state.email}
            onChange={this.onChangeEmailValue}
          />
          <text>Enter your phone number</text>
          <Input
            id="contact"
            type="tel"
            placeholder="Enter your phone number"
            value={this.state.phoneNumber}
            onChange={this.onChangeContactValue}
          />
          <Button onClick={this.onVerifyClick}>
            Send OTP for verification
          </Button>
        </div>
      </article>
    );
  }

  onChangeEmailValue = event => {
    this.setState({
      email: event.target.value,
    });
  };

  onChangeNameValue = event => {
    this.setState({
      name: event.target.value,
    });
  };

  onChangeContactValue = event => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  onVerifyClick = () => {
    axios({
      url: 'http://localhost:3000/sendOtp',
      method: 'post',
      data: {
        name: this.state.name,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
      },
    }).then(data => {
      if (data === 'sent') {
        console.log('otp has been sent');
      }
    });
  };
}

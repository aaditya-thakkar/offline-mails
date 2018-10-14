import React from 'react';
import axios from 'axios';
import OtpInput from 'react-otp-input';

import { Helmet } from 'react-helmet';
import Button from 'components/Button';
import Input from 'components/Input';
import CenteredSection from './CenteredSection';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      otp: '',
      isDisabled: true,
      hasErrored: false,
    };
    const url = new URL(window.location.href);
    this.email = url.searchParams.get('email');
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Offline Mails Grabber</title>
        </Helmet>
        <CenteredSection>
          <div>
            <div className="rowSection">
              <text>Enter your phone number</text>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your phone number"
                value={this.state.phoneNumber}
                onChange={this.onChangeContactValue}
              />
            </div>
            <Button onClick={this.onSendOtpClick}>
              {'Send OTP For Verification'}
            </Button>
            {this.state.isDisabled ? null : (
              <div>
                <text>Enter OTP</text>
                <OtpInput
                  inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    margin: '0 1rem',
                    fontSize: '2rem',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.3)',
                  }}
                  numInputs={4}
                  isDisabled={this.state.isDisabled}
                  hasErrored={this.state.hasErrored}
                  errorStyle="error"
                  onChange={this.onChangeOTPValue}
                  separator={<span>-</span>}
                  shouldAutoFocus
                />
                <Button onClick={this.onVerifyOtpClick}>Verify OTP</Button>
              </div>
            )}
          </div>
        </CenteredSection>
      </article>
    );
  }

  onChangeContactValue = event => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  onChangeOTPValue = otp => {
    this.setState({
      otp,
    });
  };

  onSendOtpClick = () => {
    axios({
      url: 'http://localhost:3000/sendOtp',
      method: 'post',
      data: {
        name: this.state.name,
        email: this.email,
        phoneNumber: this.state.phoneNumber,
      },
    }).then(data => {
      this.setState({
        isDisabled: false,
      });
      if (data === 'sent') {
        console.log('otp has been sent');
      }
    });
  };

  onVerifyOtpClick = () => {
    axios({
      url: 'http://localhost:3000/verifyOtp',
      method: 'post',
      data: {
        otp: this.state.otp,
        email: this.email,
        phoneNumber: this.state.phoneNumber,
      },
    })
      .then(data => {
        if (data === 'verified') {
          console.log('otp has been verified');
        }
      })
      .catch(() => {
        this.setState({
          hasErrored: true,
        });
      });
  };
}

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
        <div className="card">
        <svg height="120px" viewBox="0 0 512 512" width="100%" style={{marginBottom: '50px'}} xmlns="http://www.w3.org/2000/svg"><path d="m240 512h-192c-26.464844 0-48-21.535156-48-48v-416c0-26.464844 21.535156-48 48-48h192c26.464844 0 48 21.535156 48 48v416c0 26.464844-21.535156 48-48 48zm0 0" fill="#d7dee2"/><path d="m0 144h288v224h-288zm0 0" fill="#40a2e7"/><path d="m128 64h96v32h-96zm0 0" fill="#fff"/><path d="m64 64h32v32h-32zm0 0" fill="#fff"/><path d="m128 424h32v32h-32zm0 0" fill="#fff"/><path d="m240 480h-192c-26.464844 0-48-21.535156-48-48v32c0 26.464844 21.535156 48 48 48h192c26.464844 0 48-21.535156 48-48v-32c0 26.464844-21.535156 48-48 48zm0 0" fill="#bfc9d1"/><path d="m0 144h288v32h-288zm0 0" fill="#168de2"/><path d="m192 184-96 72 96 72v40h96v-224h-96zm0 0" fill="#168de2"/><path d="m192 368h96v48h-96zm0 0" fill="#bfc9d1"/><path d="m192 96h96v48h-96zm0 0" fill="#bfc9d1"/><path d="m512 384h-288v-72l-74.671875-56 74.671875-56v-72h288zm0 0" fill="#ffcb5a"/><g fill="#fff"><path d="m288 208h160v32h-160zm0 0"/><path d="m416 272h32v32h-32zm0 0"/><path d="m352 272h32v32h-32zm0 0"/><path d="m288 272h32v32h-32zm0 0"/></g></svg>
        <div className="title">Two Step Verification</div>
            { this.state.otpSent ? null : <div className="rowSection otpAuthSection">
              <Input
                id="contact"
                type="tel"
                className="noInput"
                placeholder="Enter your phone number"
                value={this.state.phoneNumber}
                onChange={this.onChangeContactValue}
              />
            </div>}
            { this.state.otpSent ? null :<div className="otpButton">
              <Button onClick={this.onSendOtpClick}>
                {'Send OTP'}
              </Button>
            </div>}
            {this.state.otpSent ? this.state.phoneNumber : null}
            {this.state.isDisabled ? null : (
              <div>
                <OtpInput
                  inputStyle={{
                    width: '2rem',
                    height: '2rem',
                    margin: '0 0.7rem',
                    fontSize: '1.2rem',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.3)',
                  }}
                  containerStyle={{
                    margin: '10px 0 15px',
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
        otpSent: true,
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

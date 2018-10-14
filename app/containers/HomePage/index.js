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
        <div className="titleText">OFFLINE MAILS</div>
        <div className="card">
        <svg xmlns="http://www.w3.org/2000/svg" height="6rem" viewBox="0 -18 512 512" width="100%" class="svg-block"><g><path d="m0 441c0 19.300781 15.699219 35 35 35h360c19.300781 0 35-15.699219 35-35v-25h-430zm0 0" data-original="#000000" class="active-path" data-old_color="#4285f4" fill="#00c6ff"/><path d="m150 236v-90h-115c-19.300781 0-35 15.699219-35 35v205h430v-150zm-75-30c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15-15-6.714844-15-15 6.714844-15 15-15zm116 150h-131v-30h131zm50-60h-181v-30h181zm0 0" data-original="#000000" class="active-path" data-old_color="#4285f4" fill="#00c6ff"/><path d="m493.804688 0h-295.640626l147.835938 100.84375zm0 0" data-original="#000000" class="active-path" data-old_color="#4285f4" fill="#cdd3d6"/><path d="m346 137.15625-166-113.230469v182.074219h332v-182.097656zm0 0" data-original="#000000" class="active-path" data-old_color="#4285f4" fill="#cdd3d6"/></g> </svg>
        <div className="title">Verify your email address</div>
        <hr />
        <span className="infoText">In order to start using your offline-mails account, you need to confirm your email address</span>
          <Button onClick={this.onGoogleClick}>
            Verify email address
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

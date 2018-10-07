import React from 'react';
import { Helmet } from 'react-helmet';

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
        </div>
      </article>
    );
  }
}

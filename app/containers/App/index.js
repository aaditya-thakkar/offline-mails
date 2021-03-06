import React from 'react';
import { Helmet } from 'react-helmet';
import { Router, Route } from 'react-router';

import styled from 'styled-components';

import HomePage from 'containers/HomePage';
import OtpAuth from 'containers/OtpAuth';
import Dashboard from 'containers/Dashboard';
import history from './history';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - OMG" defaultTitle="Offline Mails Grabber">
        <meta name="description" content="Offline Mails Grabber" />
      </Helmet>
      <Router history={history}>
        <span className="full-width">
          <Route exact path="/" component={HomePage} />
          <Route path="/otp" component={OtpAuth} />
          <Route path="/dashboard" component={Dashboard} />
        </span>
      </Router>
    </AppWrapper>
  );
}

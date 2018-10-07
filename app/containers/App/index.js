import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import HomePage from 'containers/HomePage';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - OMG" defaultTitle="Offline Mails Grabber">
        <meta name="description" content="Offline Mails Grabber" />
      </Helmet>
      <HomePage />
    </AppWrapper>
  );
}

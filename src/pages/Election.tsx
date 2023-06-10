import React, { FC } from 'react';
import { Layout } from '../components/Layout';
import ElectionContainer from '../container/Election';

export const ElectionPage: FC = () => {
  return (
    <Layout page={'election'} icon={'icon-box'}>
      <ElectionContainer />
    </Layout>
  );
};

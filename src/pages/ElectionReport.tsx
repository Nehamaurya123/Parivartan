import React, { FC } from 'react';
import { Layout } from '../components/Layout';
import ElectionReportContainer from '../container/ElectionReport';

export const ElectionReport: FC = () => {
  return (
    <Layout page={'election-report'} icon={'icon-chart-pie'}>
      <ElectionReportContainer />
    </Layout>
  );
};

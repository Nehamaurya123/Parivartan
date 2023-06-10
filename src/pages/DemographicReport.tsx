import { FC } from 'react';
import { Layout } from '../components/Layout';
import DemographicReportContainer from '../container/DemographicReport';



export const DemographicReport: FC = () => {
  return (
    <Layout page={'Demographic report'} icon={'icon-blocks'}>
      <DemographicReportContainer />
    </Layout>
  );
};

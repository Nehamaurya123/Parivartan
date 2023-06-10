import { FC } from "react";
import "../assets/scss/report.scss";
import { Layout } from "../components/Layout";
import { ReportsContainer } from "../container/Reports";

export const ReportsPage: FC = () => {
  
  return (
    <Layout page={'Reports'} icon={'icon-chart-bar'} >
      <ReportsContainer  />
    </Layout>
  );
};

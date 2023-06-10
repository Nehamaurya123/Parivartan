import { FC } from "react";
import "../assets/scss/dashboard.scss";
import { DashboardContainer } from "../container/Dashboard";
import { Layout } from "../components/Layout";

export const DashboardPage: FC = () => {
  
  return (
    <Layout page={'Dashboard'} icon={'icon-spedometer'}>
      <DashboardContainer  />
    </Layout>
  );
};

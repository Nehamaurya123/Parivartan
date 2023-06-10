import { FC } from "react";
import "../assets/scss/dashboard.scss";
import { Layout } from "../components/Layout";
import { BoothContainer } from "../container/Booth";

export const BoothPage: FC = () => {
  
  return (
    <Layout page={'Booths'} icon={'icon-box'} >
      <BoothContainer  />
    </Layout>
  );
};

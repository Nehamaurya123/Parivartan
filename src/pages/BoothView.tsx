import { FC } from "react";
import "../assets/scss/boothView.scss";
import { Layout } from "../components/Layout";
import { BoothViewContainer } from "../container/BoothView";

export const BoothViewPage: FC = () => {
  
  return (
    <Layout page={'Booths'} icon={'icon-box'} >
      <BoothViewContainer  />
    </Layout>
  );
};

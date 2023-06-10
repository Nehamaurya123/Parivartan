import { FC } from "react";
import "../assets/scss/voterView.scss";
import { Layout } from "../components/Layout";
import { VoterViewContainer } from "../container/VoterView";

export const VoterViewPage: FC = () => {
  
  return (
    <Layout page={''} icon={'icon-blocks'} >
      <VoterViewContainer  />
    </Layout>
  );
};

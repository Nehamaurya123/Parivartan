import { FC } from "react";
import "../assets/scss/voter.scss";
import { Layout } from "../components/Layout";
import { VotersContainer } from "../container/Voters";

export const VotersPage: FC = () => {
  
  return (
    <Layout page={'Voters'} icon={'icon-blocks'} >
      <VotersContainer  />
    </Layout>
  );
};

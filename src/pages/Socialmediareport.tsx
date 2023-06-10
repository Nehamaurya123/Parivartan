import { FC } from "react";
import { Layout } from "../components/Layout";
import Socialmediareport from "../container/Socialmediareport";


export const SocialmediareportPage: FC = () => {
  return (
    <Layout page={'social-media-report'} icon={'icon-user'}>
      <Socialmediareport />
    </Layout>
  );
};

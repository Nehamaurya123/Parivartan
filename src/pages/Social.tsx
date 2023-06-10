import { FC } from "react";
import { Layout } from "../components/Layout";
import SocialContainer from "../container/Social";

export const SocialPage: FC = () => {
  return (
    <Layout page={'social-media'} icon={'icon-user'}>
      <SocialContainer />
    </Layout>
  );
};

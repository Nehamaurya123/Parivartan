import { FC } from "react";
import { Layout } from "../components/Layout";
import MPAssistantContainer from "../container/Mpassistant";

export const MPAssistantPage: FC = () => {
  return (
    <Layout page={"MP Assistant"} icon={"icon-user"}>
      <MPAssistantContainer />
    </Layout>
  );
};

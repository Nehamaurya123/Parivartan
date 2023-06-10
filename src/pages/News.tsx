import { FC } from "react";
import "../assets/scss/news.scss";
import { Layout } from "../components/Layout";
import { NewsContainer } from "../container/News";

export const NewsPage: FC = () => {
  return (
    <Layout page={"Boots"} icon={"icon-news"}>
      <NewsContainer />

    </Layout>
  );
};

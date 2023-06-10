import React from "react";
import KaryakartaList from "../container/KaryaKartaList";

import { FC } from "react";
import "../assets/scss/karyakarta.scss";
import { Layout } from "../components/Layout";

export const KaryakartaListPage: FC = () => {
  return (
    <Layout page={"Karyakarta List"} icon={"icon-user-both"}>
      <KaryakartaList />
    </Layout>
  );
};

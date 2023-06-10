// import { FC } from "react";
// import "../assets/scss/voterView.scss";
// import { Layout } from "../components/Layout";
// import { KaryaKartaViewContainer, SingleRecord  } from "../container/KaryaKartaListView";

// export const KaryaKartaViewPage: FC = () => {
//   const singleRec: SingleRecord = {
//     // Provide the required properties of SingleRecord type here
//     first_name: "",
//     last_name: "",
//     booth_name: "",
//     mobile: "",
//     email: "",
//     issues: [],
//     feedback: "",
//     visited: 0,
//     voters: 0,
//     religion: "",
//     gender: "",
//     age: 0,
//   };

//   return (
//     <Layout page={''} icon={'icon-blocks'} >
//       <KaryaKartaViewContainer singleRec={singleRec} />
//     </Layout>
//   );
// };


import { FC } from "react";
import "../assets/scss/voterView.scss";
import { Layout } from "../components/Layout";
import { KaryaKartaViewContainer } from "../container/KaryaKartaListView";


export const KaryaKartaViewPage: FC = () => {

  return (
    <Layout page={''} icon={'icon-blocks'} >
    <KaryaKartaViewContainer />
    </Layout>
  );
};


// import { FC, useEffect, useState } from "react";
// import "../assets/scss/karyakartaView.scss";
// import API from "../utility/api";
// import { APIS, MONTHS } from "../utility/constants";
// import { _404 } from "../components/error/_404";
// import { composeChart, formatDateMysql } from "../utility/helper";
// import Datetime from "react-datetime";
// import { ResponsiveContainer } from "recharts";
// import moment from "moment";
// import classy from "classnames";
// import Dropdown from "../components/Dropdown";

// interface SingleRecord {
//   first_name: string;
//   last_name: string;
//   booth_name: string;
//   mobile: string;
//   email: string;
//   issues: string[];
//   feedback: string;
//   visited: number;
//   voters: number;
//   religion: string;
//   gender: string;
//   age: number;
// }

// interface TypeProps {
//   id?: any;
//   fetchKaryakarta?: any;
//   fetchKaryakartaVoters?: any;
//   fetchKaryakartaVisits?: any;
//   fetchKaryakartaTravel?: any;
//   deleteKaryakarta?: any;
//   updateFilter?: any;
//   karyakartaview?: any;
// }

// type Props = TypeProps & {
//   singleRec: SingleRecord;
// };

// export const KaryaKartaViewContainer: React.FC<Props> = ({
//   id,
//   //fetchKaryakarta,
//   fetchKaryakartaVoters,
//   fetchKaryakartaVisits,
//   fetchKaryakartaTravel,
//   //deleteKaryakarta,
//   //updateFilter,
//   karyakartaview,
//   singleRec,
// }: Props) => {
//   const [order, setOrder] = useState("ASC");
//   const [selectedBooth, setSelectedBooth] = useState("");
//   const [confirmData, setConfirmData] = useState("");
//   const [confirmView, setConfirmView] = useState("");
//   const [list, setList] = useState<any[]>([]);
//   const [loading, setLoding] = useState(false);
//   const [invalidRequest, setInvalidRequest] = useState(false);
//   const [singleRecord, setSiongleRecord] =useState();

//   const selectVisitFrom = (value: any) => {
//     fetchKaryakartaVisits(id, value, karyakartaview.filters.visit_to);
//   };

//   const selectVisitTo = (value: any) => {
//     fetchKaryakartaVisits(id, karyakartaview.filters.visit_from, value);
//   };

//   const selectTravelFrom = (value: any) => {
//     fetchKaryakartaTravel(id, value, karyakartaview.filters.travel_to);
//   };

//   const selectTravelTo = (value: any) => {
//     fetchKaryakartaTravel(id, karyakartaview.filters.travel_from, value);
//   };
//   const selectVotersFrom = (value: any) => {
//     fetchKaryakartaVoters(id, value, karyakartaview.filters.travel_to);
//   };

//   const selectVotersTo = (value: any) => {
//     fetchKaryakartaVoters(id, karyakartaview.filters.travel_from, value);
//   };

//   useEffect(() => {
//     setSelectedBooth(id);
//     FetchVotersData();
//     FetchVisitData();
//     FetchTravelData();
//   }, [id, order]);

//   // useEffect(() => {
//   //   setSelectedBooth(karyakartaview.modalopen);
//   // }, [karyakartaview.modalopen]);

//   // const fetchData = async () => {
//   //   try {
//   //     setLoding(true);
//   //     const karyakartaData = await API.get(APIS.KARYAKARTA.LIST);
//   //     console.log("kjshdk",karyakartaData)
//   //     const votersData = await API.get(
//   //        `${APIS.KARYAKARTA.GET_KARYAKARTA_VOTERS}/${id}/${karyakartaview.filters.filter_status}`
//   //     );
//   //     setList(votersData.data)
//   //     console.log("votersData",votersData);

//   //     const visitsData = await API.get(
//   //       `${APIS.KARYAKARTA.GET_KARYAKARTA_VISITS}/${id}/${moment().subtract(
//   //         10,
//   //         "month"
//   //       )}/${moment()}`
//   //     );
//   //     setList(visitsData.data)
//   //     console.log("visitsData",visitsData);
//   //     const travelData = await API.get(
//   //       `${APIS.KARYAKARTA.GET_KARYAKARTA_TRAVEL}/${id}/${moment().subtract(
//   //         10,
//   //         "month"
//   //       )}/${moment()}`
//   //     );
//   //     setList(travelData.data);
//   //     console.log("",travelData);
//   //   }catch(error){
//   //       setLoding(false);
//   //     }
//   //   }

//   let sortOptions = [
//     {
//       callback: () => setOrder("All" ),
//       icon: "",
//       label: "All",
//     },
//     {
//       callback: () => setOrder("Visited" ),
//       icon: "",
//       label: "Visited",
//     },
//     {
//       callback: () => setOrder("Positive"),
//       icon: "",
//       label: "Positive",
//     },
//     {
//       callback: () => setOrder("Negative"),
//       icon: "",
//       label: "Negative",
//     },
//   ];

//   let menu = {
//     icon: "icon-angle-down",
//     //label: karyakartaview.filters.filter_status,
//   };

//   let chartData: { count: number; date: string }[] = [];
// if (karyakartaview && karyakartaview.visits) {
//   karyakartaview.visits.map((a: any, i: number) => {
//     var split = a.created_at.split("-");
//     chartData.push({
//       count: a.count,
//       date: split[2].split(" ")[0] + " " + MONTHS[parseInt(split[1]) - 1],
//     });
//   });
// }
//   let chartDataVisit = {
//     type: "single",
//     chart: {
//       type: "bar",
//       key: "count",
//       color: "#5a3f97",
//       dot: false,
//     },
//     data: chartData,
//     axis: {
//       x: {
//         key: "date",
//       },
//       y: {
//         tickSize: 2,
//       },
//     },
//   };

//   return (
//     <div className="dashboard">
//       {loading ? (
//           <div className="page-loader">
//             <img src="/img/loading.gif" alt="Loading" />
//           </div>
//         ) : (
//         <div className="height-100">
//           {invalidRequest ? (
//             <_404 />
//           ) : (
//             <div className="vl-outer">
//               <div className="vl-item-right">
//                 <div className="vl-right-header">
//                   <div className="vl-title">Voter Assigned</div>
//                   <div className="dd-container">
//                     <div className="dd-box">
//                      <Dropdown dropdownId="1" options={sortOptions} menu={menu} />

//                     </div>
//                   </div>
//                 </div>
//                 <div className="vl-right-content">
//                   {list && list.length > 0 ? (
//                     list.map((data) => {
//                       return (
//                         <div className="vl-voter">
//                           <div className="name-outer">
//                             <div className="voter-name">
//                               {data.name}
//                               </div>
//                             <div className="voter-visit">
//                               {data.last_visited != ""
//                                 ? "Last Visited: " +
//                                   formatDateMysql(data.last_visited)
//                                 : ""}
//                             </div>
//                           </div>

//                           <div className="voter-id">
//                             {data.voter_id}
//                             <div
//                               className={classy({
//                                 "voter-type": true,
//                                 positive: data.voter_type == "Positive",
//                               })}
//                             >
//                               {data.voter_type}
//                             </div>
//                           </div>
//                           <div className="voter-desc">
//                             {data.gender} ({data.age}) {data.caste} -{" "}
//                             {data.religion}
//                           </div>

//                            {data.issues && data.issues.length > 0 ? (
//                             data.issues.map((dt:any) => {
//                               return <div className="voter-comment">{dt}</div>;
//                             })
//                           ) : (
//                             <div className="no-comment">No Issue Available</div>
//                            )}
//                         </div>
//                       );
//                    })
//                   ) : (
//                     <div className="no-voter">No Voter Available</div>
//                    )}
//                 </div>
//               </div>

//               <div className="vl-item-left">
//                 {singleRec ? (
//                   <div className="clear-table">
//                     <div className="vl-image">
//                       <div className="kv-avatar">
//                         {singleRec && singleRec.first_name
//       ? singleRec.first_name.charAt(0).toUpperCase()
//       : ""}
//     {singleRec && singleRec.last_name
//       ? singleRec.last_name.charAt(0).toUpperCase()
//       : ""}
//                       </div>

//                       <img
//                         // src={
//                         //   imagepath.path
//                         // }
//                         alt="image"
//                       />
//                     </div>
//                     <div className="vl-details">
//                       <div className="details-left">
//                         <div className="vl-name">
//                           {singleRec.first_name}{" "}
//                           {singleRec.last_name}
//                         </div>
//                         <div className="vl-booth">
//                           {singleRec.booth_name}
//                         </div>
//                         <div className="vl-mobile">
//                           Mobile:{" "}
//                           {singleRec.mobile}
//                         </div>
//                         <div className="vl-mobile">
//                           Email: {
//                           singleRec.email
//                           }
//                         </div>
//                         <div className="vl-mobile">
//                           Issues:{" "}
//                           {singleRec.issues}
//                         </div>
//                         <div className="vl-mobile">
//                           Feedback:{" "}
//                           {singleRec.feedback}
//                         </div>
//                         <div className="vl-mobile">
//                           Visits:{" "}
//                           {singleRec.visited}
//                         </div>
//                         <div className="vl-mobile">
//                           Voters:{" "}
//                           {singleRec.voters}
//                         </div>
//                       </div>
//                       <div className="details-right">
//                         <div className="vl-booth">
//                           {singleRec.religion
//                             ? singleRec.religion
//                             : "Hindu"}
//                         </div>
//                         <div className="vl-mobile">
//                           {singleRec.gender} (
//                           {singleRec.age} years)
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                  ) : (
//                   ""
//                 )}
//                 <div className="footer-outer">
//                   <div className="block">
//                     <div className="block-header">
//                       <div className="title">Daily Visits</div>
//                       <div className="date-range">
//                         <div className="date-outer">
//                           <Datetime
//                             timeFormat={false}
//                             // value={filters.visit_from}
//                             closeOnSelect={true}
//                             // onChange={this.selectVisitFrom.bind(this)}
//                             dateFormat="DD-MM-YYYY"
//                             input={true}
//                             // inputProps={{ readonly: true }}
//                           />
//                         </div>
//                         <div className="date-text"> to </div>
//                         <div className="date-outer">
//                           <Datetime
//                             timeFormat={false}
//                             // value={filters.visit_to}
//                             // closeOnSelect={true}
//                             // onChange={this.selectVisitTo.bind(this)}
//                             dateFormat="DD-MM-YYYY"
//                             input={true}
//                             // inputProps={{ readonly: true }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="block-content">
//                       <div>
//                         <ResponsiveContainer height={350}>
//                           {composeChart(chartDataVisit)}
//                         </ResponsiveContainer>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="block">
//                     <div className="block-header">
//                       <div className="title">Distance Travelled</div>
//                       <div className="date-range">
//                         <div className="date-outer">
//                           <Datetime
//                             timeFormat={false}
//                             // value={
//                             //   this.props.karyakartaview.filters.travel_from
//                             // }
//                             closeOnSelect={true}
//                             // onChange={this.selectTravelFrom.bind(this)}
//                             dateFormat="DD-MM-YYYY"
//                             input={true}
//                             // inputProps={{ readonly: true }}
//                           />
//                         </div>
//                         <div className="date-text"> to </div>
//                         <div className="date-outer">
//                           <Datetime
//                             timeFormat={false}
//                             // value={this.props.karyakartaview.filters.travel_to}
//                             closeOnSelect={true}
//                             // onChange={this.selectTravelTo.bind(this)}
//                             dateFormat="DD-MM-YYYY"
//                             input={true}
//                             // inputProps={{ readonly: true }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* <div className="block-content">
//                       {this.props.karyakartaview.travel ? (
//                         <div className="map-outer">
//                           <div className="map-container">
//                             <div className="map-con">
//                               <Maptravel   _id={1} coordinates={this.props.karyakartaview.travel.log} zoomlevel={14} />
//                             </div>
//                             <div className="map-extra">
//                               <div className="map-distance">
//                                 Distance Travelled:{" "}
//                                 {this.props.karyakartaview.travel.distance}{" "}
//                                 {this.props.karyakartaview.travel.unit}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         ""
//                       )}
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

import {useEffect, useState } from "react";
import "../assets/scss/karyakartaView.scss";
import API from "../utility/api";
import { APIS, MONTHS } from "../utility/constants";
import { _404 } from "../components/error/_404";
import { composeChart, formatDateMysql } from "../utility/helper";
import Datetime from "react-datetime";
import { ResponsiveContainer } from "recharts";
import moment from "moment";
import classy from "classnames";
import Dropdown from "../components/Dropdown";

export interface SingleRecord {
  first_name: string;
  last_name: string;
  booth_name: string;
  mobile: string;
  email: string;
  issues: string[];
  feedback: string;
  visited: number;
  voters: number;
  religion: string;
  gender: string;
  age: number;
}

interface TypeProps {
  id?: any;
  // fetchKaryakarta?: any;
  // fetchKaryakartaVoters?: any;
  // fetchKaryakartaVisits?: any;
  // fetchKaryakartaTravel?: any;
  deleteKaryakarta?: any;
  updateFilter?: any;
  karyakartaview?: any;
}

type Props = TypeProps & {
  singleRec: SingleRecord;
};

export const KaryaKartaViewContainer: React.FC<Props> = ({
  id,
  karyakartaview,
  singleRec,
}: Props) => {
  const [order, setOrder] = useState("ASC");
  const [selectedBooth, setSelectedBooth] = useState("");
  const [list, setList] = useState<any[]>();
  const [loading, setLoding] = useState(false);
  const [invalidRequest, setInvalidRequest] = useState(false);
  const [filters, setFilters] = useState<any>({
    visit_from: "",
    visit_to: "",
    travel_from: "",
    travel_to: "",
    voters_from: "",
    voters_to: "",
  });

  const selectVisitFrom = (value: any) => {
    setFilters({ ...filters, visit_to: value });
  };

  const selectVisitTo = (value: any) => {
    setFilters({ ...filters, visit_from: value });
  };

  const selectTravelFrom = (value: any) => {
    setFilters({ ...filters, travel_to: value });
  };

  const selectTravelTo = (value: any) => {
    setFilters({ ...filters, travel_from: value });
  };
  const selectVotersFrom = (value: any) => {
    setFilters({ ...filters, travel_to: value });
  };

  const selectVotersTo = (value: any) => {
    setFilters({ ...filters, travel_from: value });
  };

  useEffect(() => {
    setSelectedBooth(id);
    FetchVotersData();
    FetchVisitData();
    FetchTravelData();
    FetchData();
  }, [id, order]);

  // useEffect(() => {
  //   setSelectedBooth(karyakartaview.modalopen);
  // }, [karyakartaview.modalopen]);
  
  const FetchData = async () => {
    setLoding(true);
    try {
      const listData = await API.get(APIS.KARYAKARTA.LIST);
      setLoding(false);
      setList(listData.data);
      console.log(listData.data);
    } catch (error) {
      console.error(error);
    }
  };
  const FetchVotersData = async () => {
    setLoding(true);
    try {
      const votersData = await API.get(
        APIS.KARYAKARTA.GET_KARYAKARTA_VOTERS + 28
      );
      setLoding(false);
      setList(votersData.data);
      console.log("votersData", votersData);
    } catch (error) {
      console.error(error);
    }
  };
  const FetchVisitData = async () => {
    setLoding(true);
    try {
      const visitsData = await API.get(
        APIS.KARYAKARTA.GET_KARYAKARTA_VISITS + 28
      );
      setLoding(false);
      setList(visitsData.data);
      console.log("visitsData", visitsData);
    } catch (error) {
      console.error(error);
    }
  };
  const FetchTravelData = async () => {
    try {
      setLoding(true);
      const travelData = await API.get(
        APIS.KARYAKARTA.GET_KARYAKARTA_TRAVEL + 28
      );
      setLoding(false);
      setList(travelData.data);
      console.log("travelData", travelData);
    } catch (error) {
      console.error(error);
    }
  };

  let sortOptions = [
    {
      callback: () => setOrder("All"),
      icon: "",
      label: "All",
    },
    {
      callback: () => setOrder("Visited"),
      icon: "",
      label: "Visited",
    },
    {
      callback: () => setOrder("Positive"),
      icon: "",
      label: "Positive",
    },
    {
      callback: () => setOrder("Negative"),
      icon: "",
      label: "Negative",
    },
  ];

  let menu = {
    icon: "icon-angle-down",
    label: "filter_status",
  };

  let chartData: { count: number; date: string }[] = [];
  if (karyakartaview && karyakartaview.visits) {
    karyakartaview.visits.map((a: any, i: number) => {
      var split = a.created_at.split("-");
      chartData.push({
        count: a.count,
        date: split[2].split(" ")[0] + " " + MONTHS[parseInt(split[1]) - 1],
      });
    });
  }
  let chartDataVisit = {
    type: "single",
    chart: {
      type: "bar",
      key: "count",
      color: "#5a3f97",
      dot: false,
    },
    data: chartData,
    axis: {
      x: {
        key: "date",
      },
      y: {
        tickSize: 2,
      },
    },
  };

  return (
    <div className="dashboard">
      {loading ? (
        <div className="page-loader">
          <img src="/img/loading.gif" alt="Loading" />
        </div>
      ) : (
        <div className="height-100">
          {invalidRequest ? (
            <_404 />
          ) : (
            <div className="vl-outer">
              <div className="vl-item-right">
                <div className="vl-right-header">
                  <div className="vl-title">Voter Assigned</div>
                  <div className="dd-container">
                    <div className="dd-box">
                      <Dropdown
                        id="1"
                        options={sortOptions}
                        menu={menu}
                      />
                    </div>
                  </div>
                </div>
                <div className="vl-right-content">
                  {list && list?.length > 0 ?(
                    list.map((data) => {
                      return (
                        <div className="vl-voter">
                          <div className="name-outer">
                            <div className="voter-name">{data.name}</div>
                            <div className="voter-visit">
                              {data.last_visited != ""
                                ? "Last Visited: " +
                                  formatDateMysql(data.last_visited)
                                : ""}
                            </div>
                          </div>

                          <div className="voter-id">
                            {data.voter_id}
                            <div
                              className={classy({
                                "voter-type": true,
                                positive: data.voter_type == "Positive",
                              })}
                            >
                              {data.voter_type}
                            </div>
                          </div>
                          <div className="voter-desc">
                            {data.gender} ({data.age}) {data.caste} -{" "}
                            {data.religion}
                          </div>
                          {data.issues && data.issues.length > 0 ? (
                            data.issues.map((dt: any) => {
                              return <div className="voter-comment">{dt}</div>;
                            })
                          ) : (
                            <div className="no-comment">No Issue Available</div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-voter">No Voter Available</div>
                  )}
                </div>
              </div>
              <div className="vl-item-left">
                {singleRec ? (
                  <div className="clear-table">
                    <div className="vl-image">
                      <div className="kv-avatar">
                        {singleRec && singleRec.first_name
                          ? singleRec.first_name.charAt(0).toUpperCase()
                          : ""}
                        {singleRec && singleRec.last_name
                          ? singleRec.last_name.charAt(0).toUpperCase()
                          : ""}
                      </div>
                      <img
                        // src={
                        //   imagepath.path
                        // }
                        alt="image"
                      />
                    </div>
                    <div className="vl-details">
                      <div className="details-left">
                        <div className="vl-name">
                          {singleRec.first_name} {singleRec.last_name}
                        </div>
                        <div className="vl-booth">{singleRec.booth_name}
                        {JSON.stringify(singleRec)}
                        </div>
                        <div className="vl-mobile">
                          Mobile: {singleRec.mobile}
                        </div>
                        <div className="vl-mobile">
                          Email: {singleRec.email}
                        </div>
                        <div className="vl-mobile">
                          Issues: {singleRec.issues}
                        </div>
                        <div className="vl-mobile">
                          Feedback: {singleRec.feedback}
                        </div>
                        <div className="vl-mobile">
                          Visits: {singleRec.visited}
                        </div>
                        <div className="vl-mobile">
                          Voters: {singleRec.voters}
                        </div>
                      </div>
                      <div className="details-right">
                        <div className="vl-booth">
                          {singleRec.religion ? singleRec.religion : "Hindu"}
                        </div>
                        <div className="vl-mobile">
                          {singleRec.gender} ({singleRec.age} years)
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="footer-outer">
                  <div className="block">
                    <div className="block-header">
                      <div className="title">Daily Visits</div>
                      <div className="date-range">
                        <div className="date-outer">
                          <Datetime
                            timeFormat={false}
                            // value={filters.visit_from}
                            closeOnSelect={true}
                            onChange={selectVisitFrom.bind(this)}
                            dateFormat="DD-MM-YYYY"
                            input={true}
                            inputProps={{ readOnly: true }}
                          />
                        </div>
                        <div className="date-text"> to </div>
                        <div className="date-outer">
                          <Datetime
                            timeFormat={false}
                            //value={filters.visit_to}
                            closeOnSelect={true}
                            onChange={selectVisitTo.bind(this)}
                            dateFormat="DD-MM-YYYY"
                            input={true}
                            inputProps={{ readOnly: true }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="block-content">
                      <div>
                        <ResponsiveContainer height={350}>
                          {composeChart(chartDataVisit)}
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="block">
                    <div className="block-header">
                      <div className="title">Distance Travelled</div>
                      <div className="date-range">
                        <div className="date-outer">
                          <Datetime
                            timeFormat={false}
                            value={filters.travel_from}
                            closeOnSelect={true}
                            onChange={selectTravelFrom.bind(this)}
                            dateFormat="DD-MM-YYYY"
                            input={true}
                            inputProps={{ readOnly: true }}
                          />
                        </div>
                        <div className="date-text"> to </div>
                        <div className="date-outer">
                          <Datetime
                            timeFormat={false}
                            value={filters.travel_to}
                            closeOnSelect={true}
                            onChange={selectTravelTo.bind(this)}
                            dateFormat="DD-MM-YYYY"
                            input={true}
                            inputProps={{ readOnly: true }}
                          />
                         
                        </div>
                      </div>
                    </div>

                    <div className="block-content">
                      {/* {this.props.karyakartaview.travel ? ( */}
                      <div className="map-outer">
                        <div className="map-container">
                          <div className="map-con">
                            {/* <Maptravel   _id={1} coordinates={this.props.karyakartaview.travel.log} zoomlevel={14} /> */}
                          </div>
                          <div className="map-extra">
                            <div className="map-distance">
                              Distance Travelled:{" "}
                              {/* {this.props.karyakartaview.travel.distance}{" "}
                                {this.props.karyakartaview.travel.unit} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ) : (
                        ""
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

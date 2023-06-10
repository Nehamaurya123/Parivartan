import { FC, useEffect, useMemo, useState } from "react";
import "../assets/scss/dashboard.scss";
import { ResponsiveContainer } from "recharts";
import { composeChart } from "../utility/helper";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import { Mapview } from "../components/Mapview";

export const DashboardContainer: FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [filter_text, setFilter_text] = useState<any>('');
  const [filteredBooths, setFilteredBooths] = useState<any>([]); 

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(data){
      const txt = filter_text.toLowerCase();
      const filters = data.booths.filter((f:any)=>{
        const bn = f.boothname.toLowerCase();
        return bn.includes(txt)||bn.includes(txt)||bn.includes(txt)||bn.includes(txt);
      });
      setFilteredBooths(filters);
    }
  },[filter_text, data]);

  const fetchData = async () => {
    setLoading(true);
    const res = await API.get(APIS.DASHBOARD.DATA);
    setLoading(false);
    setData(res.data);
  };

  const chartDataTargetted = useMemo(() => {
    if (!data) return null;
    return {
      type: "single",
      chart: {
        type: "line",
        key: "c",
        color: "#5a3f97",
        dot: false,
      },
      data: data.targetted_chart,
    };
  }, [data]);

  const round = (val: number) => {
    return Math.round(val * 100) / 100;
  };

  const getPercent = (from: number, to: number) => {
    if (from < to) {
      if (from == 0) return 100;
      return round((to * 100) / from);
    } else if (from > to) {
      if (to == 0) return -100;
      return -1 * round((to * 100) / from);
    } else {
      return 0;
    }
  };

  const percentTargetted = useMemo(() => {
    if (!data) return null;
    return getPercent(data.targetted_chart[2].c, data.targetted_chart[3].c);
  }, [data]);

  const chartDataFeedback = useMemo(() => {
    if (!data) return null;
    return {
      type: "single",
      chart: {
        type: "line",
        key: "c",
        color: "#ea1f8d",
        dot: false,
      },
      data: data.feedback_chart,
    };
  }, [data]);

  const percentFeedback = useMemo(() => {
    if (!data) return null;
    return getPercent(data.feedback_chart[2].c, data.feedback_chart[3].c);
  }, [data]);

  const chartDataKaryakarta = useMemo(() => {
    if (!data) return null;
    return {
      type: "single",
      chart: {
        type: "line",
        key: "c",
        color: "#f6961d",
        dot: false,
      },
      data: data.karyakarta_chart,
    };
  }, [data]);

  const percentkaryakarta = useMemo(() => {
    if (!data) return null;
    return getPercent(data.karyakarta_chart[2].c, data.karyakarta_chart[3].c);
  }, [data]);

  const chartDataStories = useMemo(() => {
    if (!data) return null;
    return {
      type: "single",
      chart: {
        type: "line",
        key: "c",
        color: "#555",
        dot: false,
      },
      data: data.stories_chart,
    };
  }, [data]);
  const percentStories = useMemo(() => {
    if (!data) return null;
    return getPercent(data.stories_chart[2].c, data.stories_chart[3].c);
  }, [data]);

  return (
    <div className="dashboard">
      {loading || !data ? (
        <div className="page-loader">
          <img src="/img/loading.gif" />
        </div>
      ) : (
        <div>
          <div className="container-dashboard">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="db-heading">OVERVIEW</div>
                  <div className="db-actions">
                    {/* <div className="action">
											<i className="icon-download"></i>
										</div> */}
                    <div className="action" onClick={() => window.print()}>
                      <i className="icon-print"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="db-summary purpal">
                    <div className="values no-margin">
                      <div className="heading black">{data.voters}</div>
                      <div className="label">Voters</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="db-summary purpal">
                    <div className="graph">
                      <ResponsiveContainer height={60}>
                        {composeChart(chartDataTargetted)}
                      </ResponsiveContainer>
                    </div>
                    <div className="values">
                      {percentTargetted && (
                        <div className="arrow-container">
                          {percentTargetted > 0 ? (
                            <div className="arrow">
                              <i className="icon-arrow-up"></i>{" "}
                              {Math.abs(percentTargetted)}%
                            </div>
                          ) : percentTargetted == 0 ? (
                            <div className="arrow yellow">
                              <i className="icon-point"></i>{" "}
                              {Math.abs(percentTargetted)}%
                            </div>
                          ) : (
                            <div className="arrow red">
                              <i className="icon-arrow-down"></i>{" "}
                              {Math.abs(percentTargetted)}%
                            </div>
                          )}
                        </div>
                      )}
                      <div className="heading purpal">{data.targetted}</div>
                      <div className="label">Voter Visited</div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="db-summary red">
                    <div className="graph">
                      <ResponsiveContainer height={60}>
                        {composeChart(chartDataFeedback)}
                      </ResponsiveContainer>
                    </div>
                    <div className="values">
                      {percentFeedback && (
                        <div className="arrow-container">
                          {percentFeedback > 0 ? (
                            <div className="arrow">
                              <i className="icon-arrow-up"></i>{" "}
                              {Math.abs(percentFeedback)}%
                            </div>
                          ) : percentFeedback == 0 ? (
                            <div className="arrow yellow">
                              <i className="icon-point"></i>{" "}
                              {Math.abs(percentFeedback)}%
                            </div>
                          ) : (
                            <div className="arrow red">
                              <i className="icon-arrow-down"></i>{" "}
                              {Math.abs(percentFeedback)}%
                            </div>
                          )}
                        </div>
                      )}
                      <div className="heading red">{data.feedback}</div>
                      <div className="label">Issues/Feedback from Voters</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="db-summary">
                    <div className="graph">
                      <ResponsiveContainer height={60}>
                        {composeChart(chartDataKaryakarta)}
                      </ResponsiveContainer>
                    </div>
                    <div className="values">
                      {percentkaryakarta && (
                        <div className="arrow-container">
                          {percentkaryakarta > 0 ? (
                            <div className="arrow">
                              <i className="icon-arrow-up"></i>{" "}
                              {Math.abs(percentkaryakarta)}%
                            </div>
                          ) : percentkaryakarta == 0 ? (
                            <div className="arrow yellow">
                              <i className="icon-point"></i>{" "}
                              {Math.abs(percentkaryakarta)}%
                            </div>
                          ) : (
                            <div className="arrow red">
                              <i className="icon-arrow-down"></i>{" "}
                              {Math.abs(percentkaryakarta)}%
                            </div>
                          )}
                        </div>
                      )}
                      <div className="heading yellow">{data.karyakarta}</div>
                      <div className="label">Active Volunteer</div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-3">
									<div className="db-summary">
										<div className="graph">
											<ResponsiveContainer height={60}>{composeChart(chartDataStories)}</ResponsiveContainer>
										</div>
										<div className="values">
											<div className="arrow-container">
												{(percentStories>0)?<div className="arrow">
													<i className="icon-arrow-up"></i>  {Math.abs(percentStories)}%
													</div>:(percentStories==0)?<div className="arrow yellow">
														<i className="icon-point"></i>  {Math.abs(percentStories)}%
													</div>:<div className="arrow red">
														<i className="icon-arrow-down"></i>  {Math.abs(percentStories)}%
													</div>} 
											</div>
											<div className="heading">{data.stories}</div>
											<div className="label">Stories Pushed</div>
										</div>
									</div>
								</div> */}
              </div>
            </div>
            <div className="db-bottom">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="head">
                      <div className="heading">STATE OVERVIEW</div>
                    </div>
                    <div className="db-outline">
                      <div className="db-blocks">
                        <div className="db-block grey">
                          <div className="block-label">State</div>
                          <div className="block-head">{data.constituency}</div>
                        </div>
                        <div className="db-block">
                          <div className="block-head">{data.booths.length}</div>
                          <div className="block-label">Booths</div>
                        </div>

                        <div className="db-block">
                          <div className="block-head green">
                            {data.positive}
                          </div>
                          <div className="block-label">Positive Voters</div>
                        </div>
                        <div className="db-block">
                          <div className="block-head red">{data.negative}</div>
                          <div className="block-label">Negative Voters</div>
                        </div>
                        <div className="db-block">
                          <div className="block-head yellow">
                            {data.neutral}
                          </div>
                          <div className="block-label">Normal Voters</div>
                        </div>
                        <div className="db-block">
                          {/* <div className="block-head">{data.voters}</div> */}
                          <div className="block-head">{data.important}</div>
                          <div className="block-label">Important Voters</div>
                        </div>
                      </div>
                      <div
                        className="db-map"
                        style={{ maxHeight: 500, overflow: "hidden" }}
                      >
                        <div className="mapviewouter">
                          <Mapview
                            _id={1}
                            coordinates={filteredBooths}
                            zoomlevel={14}
                          />
                          <div className="mapview-search">
                            <div className="mapsearch-text">
                              <input
                                className=""
                                id="txtBoothMAPSearch"
                                onChange={(e)=>setFilter_text(e.target.value)}
                                value={filter_text}
                                placeholder="Search booth"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <img src="https://cdn.sitetheory.io/nest001/site/32/47454/Custom%20Markers%20are%20Cutoff%20by%20Canvas%20Tiles-xl.jpg" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid" style={{ display: "none" }}>
              <div className="row">
                <div className="col-md-12">
                  <div className="no-data text-center">
                    <div className="ico">
                      <i className="icon-info"></i>
                    </div>
                    <p className="px18 weight700">Sorry :(</p>
                    <p>There is nothing to show here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

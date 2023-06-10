import { FC, useEffect, useMemo, useState } from "react";
import API from "../utility/api";
import { APIS } from "../utility/constants";
import { useAuth } from "../utility/authProvider";
import { ResponsiveContainer } from "recharts";
import { composeChart } from "../utility/helper";
import Dropdown from "../components/Dropdown";

export const ReportsContainer: FC = () => {
  const [loading, setLoading] = useState(false);
  const [boothlist, setBoothlist] = useState<any>([]);
  const [data, setData] = useState<any>(null);
  const [selected_booth, setSelected_booth] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(selected_booth){
      fetchReportData(selected_booth.id);
    }
  }, [selected_booth]);



  const fetchData = async () => {
    setLoading(true);
    const res = await API.get(APIS.KARYAKARTA.BOOTH_LIST);
    setLoading(false);
    setBoothlist(res.data);
    if(res.data.length > 0){
      
      setSelected_booth({id: res.data[0].id, label: res.data[0].boothname, booth: res.data[0]});
    }
    
  };
  
  const fetchReportData = async (id: any) => {
    setLoading(true);
    const res = await API.get(APIS.REPORT.DATA+id);
    setLoading(false);
    setData(res.data);
     console.log('repd', res.data);
  };

  const changeBooth = (id: any,label: any,booth: any) => {
		setSelected_booth({id, label, booth: booth});
  }

  let boothoptions = [];
  let menu_booth = {
    icon: "icon-angle-down",
    label: selected_booth?selected_booth.label:'Select Booth',
  };

  if (boothlist) {
    for (let i = 0; i < boothlist.length; i++) {
      let booth = boothlist[i];
      
      boothoptions.push({
        id: booth.id,
        callback: changeBooth.bind(this, booth.id, booth.boothname, booth),
        icon: "",
        label: booth.boothname,
      });
    }
    if ((!selected_booth || selected_booth.id == 0) && boothoptions.length > 0) {
      menu_booth = { icon: "icon-angle-down", label: boothoptions[0].label };
    }
  }

  let chartDataIssue = null;
  let chartDataFeedback = null;
  let chartDataCaste = null;
  if (data && data.issue) {
    let data02: any = [];
    if (data.voter) {
      data.voter.caste.map((a: any) => {
        data02.push({ name: a.caste, value: a.count });
      });
    }
    var data03: any = [];
    if (data.issue) {
      data.issue.data.map((a:any, i: number) => {
        if (a.issue && i < 6) {
          data03.push({ name: a.issue, value: a.count });
        }
      });
    }

    chartDataIssue = {
      type: "single",
      chart: {
        type: "bar",
        key: "value",
        color: "#ab0303",
        dot: false,
      },
      data: data03,
      tooltip: true,
      axis: {
        x: {
          key: "name",
        },
        y: {
          tickSize: 2,
        },
      },
    };
    chartDataCaste = {
      type: "single",
      chart: {
        type: "bar",
        key: "value",
        color: "#5a3f97",
        dot: false,
      },
      tooltip: true,
      data: data02,
      axis: {
        x: {
          key: "name",
        },
        y: {
          tickSize: 2,
        },
      },
    };

    chartDataFeedback = {
      type: "single",
      chart: {
        type: "bar",
        key: "value",
        color: "#135302",
        dot: false,
      },
      tooltip: true,
      data: [
        {
          name: "Positive",
          value: data.feedback.positive,
        },
        {
          name: "Negative",
          value: data.feedback.negative,
        },
        {
          name: "Neutral",
          value: data.feedback.neutral,
        },
      ],
      axis: {
        x: {
          key: "name",
        },
        y: {
          tickSize: 2,
        },
      },
    };
  }

  return (
    <div className="dashboard">
      {loading ? (
        <div className="page-loader">
          <img src="/img/loading.gif" />
        </div>
      ) : (
        <div className="report">
          <div className="left-panel">
            <div className="left-panel-inner">
              <div className="booth-selection">
                <div className="heading">SELECT BOOTH</div>
                <div className="select-title">
                  <Dropdown id="2" options={boothoptions} menu={menu_booth} />
                  {/* <i className="icon-angle-down"></i>
								<span>Eram Inter College Eram Inter College  Eram Inter College </span>  */}
                </div>
                <div className="booth-info">
                  {selected_booth && selected_booth.booth
                    ? selected_booth.booth.ac_name
                    : ""}
                </div>
                {/* <div className="booth-info">
								<span>{(this.state.selected_booth.booth)?"LONG "+this.round(this.state.selected_booth.booth.longitude):""} </span>
							    <span></span>{(this.state.selected_booth.booth)?"LAT "+this.round(this.state.selected_booth.booth.latitude):""}
							</div> */}
              </div>
              {data && <>
              
              <div className="data-block">
                <a
                  className="block-1"
                  href={
                    "/booth-voters/" +
                    (selected_booth && selected_booth.booth.id
                      ? selected_booth.booth.id
                      : "0")
                  }
                >
                  <div className="value">
                    {data.voter.voters}
                  </div>
                  <div className="label">Total Voters</div>
                </a>
                <div className="block-2">
                  <div className="value yellow">
                    {data.voter.voters > 0
                      ? Math.round(
                          (data.voter.hindu * 100) /
                            data.voter.voters
                        )
                      : "0"}
                    %
                  </div>
                  <div className="label">Hindu</div>
                </div>
                <div className="block-3">
                  <div className="value green">
                    {data.voter.voters > 0
                      ? Math.round(
                          (data.voter.muslim * 100) /
                            data.voter.voters
                        )
                      : "0"}
                    %
                  </div>
                  <div className="label">Muslim</div>
                </div>
              </div>
              <div className="data-block">
                <a
                  className="block-1"
                  style={{cursor: 'pointer'}}
                  href={
                    "/booth-volunteer/" +
                    (selected_booth.booth.id
                      ? selected_booth.booth.id
                      : "0")
                  }
                >
                  <div className="value">
                    {data.karyakarta.total}
                  </div>
                  <div className="label">Volunteer</div>
                </a>
                <div className="block-2"></div>
                <div className="block-3">
                  <div className="value purpal">
                    {data.karyakarta.active}
                  </div>
                  <div className="label">Active</div>
                </div>
              </div>
              <div className="data-block">
                <div className="block-1">
                  <div className="value">
                    {data.issue.count}
                  </div>
                  <div className="label">Issues</div>
                </div>
                {data.issue.issue_1 ? (
                  <div className="block-2">
                    <div className="value purpal">
                      {data.issue.issue_1.percent}%
                    </div>
                    <div className="label">
                      {data.issue.issue_1.issue}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {data.issue.issue_2 ? (
                  <div className="block-3">
                    <div className="value red">
                      {data.issue.issue_2.percent}%
                    </div>
                    <div className="label">
                      {data.issue.issue_2.issue}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="data-block">
                <div className="block-1">
                  <div className="value">
                    {data.feedback.count}
                  </div>
                  <div className="label">Feedback</div>
                </div>
                {data.feedback.negative_per ? (
                  <div className="block-2">
                    <div className="value red">
                      {data.feedback.negative_per}%
                    </div>
                    <div className="label">Negative</div>
                  </div>
                ) : (
                  ""
                )}
                {data.feedback.positive_per ? (
                  <div className="block-3">
                    <div className="value green">
                      {data.feedback.positive_per}%
                    </div>
                    <div className="label">Positive</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="data-block">
                <div className="heading">Voter Type</div>
                {data.voter.negative != "undefined" ? (
                  <div className="block-2 center">
                    <div className="value red">
                      {data.voter.negative}
                    </div>
                    <div className="label">Negative</div>
                  </div>
                ) : (
                  ""
                )}
                {data.voter.positive != "undefined" ? (
                  <div className="block-2 center">
                    <div className="value green">
                      {data.voter.positive}
                    </div>
                    <div className="label">Positive</div>
                  </div>
                ) : (
                  ""
                )}
                {data.voter.positive != "neutral" ? (
                  <div className="block-2 center">
                    <div className="value purpal">
                      {data.voter.neutral}
                    </div>
                    <div className="label">Neutral</div>
                  </div>
                ) : (
                  ""
                )}
                {data.voter.important != "neutral" ? (
                  <div className="block-2 center">
                    <div className="value green">
                      {data.voter.important}
                    </div>
                    <div className="label">Important</div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {data.karyakarta.top_karyakarta ? (
                <div className="data-block">
                  <div className="karyakarta">
                    <div className="label">TOP VOLUNTEER</div>
                    <div className="name">
                      {
                        data.karyakarta.top_karyakarta
                          .first_name
                      }{" "}
                      {
                        data.karyakarta.top_karyakarta
                          .last_name
                      }
                    </div>
                    {data.karyakarta.top_karyakarta
                      .assistant ? (
                      <div className="assistant">
                        Assistant{" "}
                        <span>
                          {
                            data.karyakarta.top_karyakarta
                              .assistant
                          }
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mobile">
                      {data.karyakarta.top_karyakarta.mobile}
                    </div>
                    <div className="margin-top-15">
                      <div className="k-block">
                        <div className="value">
                          {
                            data.karyakarta.top_karyakarta
                              .voters
                          }
                        </div>
                        <div className="label">Voters</div>
                      </div>
                      <div className="k-block">
                        <div className="value purpal">
                          {
                            data.karyakarta.top_karyakarta
                              .visited
                          }
                        </div>
                        <div className="label">Visited</div>
                      </div>
                      <div className="k-block">
                        <div className="value green">
                          {
                            data.karyakarta.top_karyakarta
                              .positive_percent
                          }
                          %
                        </div>
                        <div className="label">Positive</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
                </>}
            </div>
          </div>
          {data && <div className="right-panel">
            <div className="heading">{menu_booth.label}</div>
            <div className="voter-data">
              <div className="voter-data-graph">
                {/*<div className="graph-box">
							<PieChartTwoLevel data={data01} fill="#064c94" />
						</div> */}
                {/* <div className="graph-box">
							<PieChartTwoLevel data={data02} fill="#3b0568" />
						</div> */}
                <div>{/* <PieChartTwoLevel data={data03} /> */}</div>
                <div className="graph-box graph-box-100">
                  <div className="graph-box-outer">
                    <div className="graph-box-header">Caste</div>
                    <div className="graph-box-content">
                      {data.issue ? (
                        <ResponsiveContainer height={250}>
                          {composeChart(chartDataCaste)}
                        </ResponsiveContainer>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="graph-box">
                  <div className="graph-box-outer">
                    <div className="graph-box-header">Issues</div>
                    <div className="graph-box-content">
                      {data.issue ? (
                        <ResponsiveContainer height={250}>
                          {composeChart(chartDataIssue)}
                        </ResponsiveContainer>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="graph-box">
                  <div className="graph-box-outer">
                    <div className="graph-box-header">Feedback</div>
                    <div className="graph-box-content">
                      {data.issue ? (
                        <ResponsiveContainer height={250}>
                          {composeChart(chartDataFeedback)}
                        </ResponsiveContainer>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      )}
    </div>
  );
};

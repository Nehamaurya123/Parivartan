import React, { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "../assets/scss/socialmediareport.scss";
import API from "../utility/api";
import { APIS, COLOURS } from "../utility/constants";

interface ChartData {
  [key: string]: number | string;
}

const SocialMediaReport = () => {
  const [chartDataShares, setChartDataShares] = useState<any>([]);
  const [chartDataLikes, setChartDataLikes] = useState<any>([]);
  const [chartDataReactions, setChartDataReactions] = useState<any>([]);
  const [chartDataComments, setChartDataComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    try {
      const response = await API.get(APIS.SOCIALMEDIAREPORT.SOCIAMEDIADATA);
      setData(response.data || []);
      console.log(response.data);
      initChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const composeChart = (config: any): JSX.Element | null => {

    const {data} = config;
    if (!data) {
      return <></>;
    }

    return (
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((chart: any, index: number) => (
          <Bar key={chart.key} dataKey={chart.key} fill={chart.color} />
        ))}
      </BarChart>
    );
  };

  const initChartData = (data: any) => {
    const charts: any[] = [];
    const dataLikes: any[] = [];
    const dataShares: any[] = [];
    const dataReactions: any[] = [];
    const dataComments: any[] = [];
    
    data.forEach((dataItem: any, i: number) => {
      charts.push({
        type: "line",
        key: dataItem.name,
        color: COLOURS[i % 30],
        dot: false,
      });

      dataLikes.push({
        day: dataItem.social_media_data.day,
        [dataItem.name]: dataItem.social_media_data.likes,
      });

      dataShares.push({
        day: dataItem.social_media_data.day,
        [dataItem.name]: dataItem.social_media_data.shares,
      });

      dataReactions.push({
        day: dataItem.social_media_data.day,
        [dataItem.name]: dataItem.social_media_data.reactions,
      });

      dataComments.push({
        day: dataItem.social_media_data.day,
        [dataItem.name]: dataItem.social_media_data.comments,
      });
    });
const chartDataLikes = {
  type:"multiple",
  charts:charts,
  data:dataLikes,
  tooltip:true,
  legend:true,
  axis:{
    x:{
      key:"day",
    },
    y:{
      tickerSize:10,
    },
  },
};
    const chartDataShares = {
      type: "multiple",
      charts: charts,
      data: dataShares,
      tooltip: true,
      legend: true,
      axis: {
        x: {
          key: "day",
        },
        y: {
          tickerSize: 10,
        },
      },
    };

    const chartDataReactions = {
      type: "multiple",
      charts: charts,
      data: dataReactions,
      tooltip: true,
      legend: true,
      axis: {
        x: {
          key: "day",
        },
        y: {
          tickerSize: 10,
        },
      },
    };

    const chartDataComments = {
      type: "multiple",
      charts: charts,
      data: dataComments,
      tooltip: true,
      legend: true,
      axis: {
        x: {
          key: "day",
        },
        y: {
          tickerSize: 10,
        },
      },
    };
       
   // console.log("Setthings chart data", chartDataReactions)
    setChartDataLikes(chartDataLikes);
    setChartDataShares(chartDataShares);
    setChartDataReactions(chartDataReactions);
    setChartDataComments(chartDataComments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="report-social">
        {loading ? (
          <div className="page-loader">
            <img src="/img/loading.gif" alt="Loading" />
          </div>
        ) : (
          <>
            <div className="graph-box-content">
              <div className="left-panel-inner">
                <div className="booth-selection">
                  <div className="heading-panel">SHARES</div>
                </div>
                <div className="voter-graph">
                  <div className="voter-data">
                    <ResponsiveContainer height={200}>
                      {chartDataShares && composeChart(chartDataShares)}
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-box-content">
              <div className="left-panel-inner">
                <div className="booth-selection">
                  <div className="heading-panel">LIKES</div>
                </div>
                <div className="voter-graph">
                  <div className="voter-data">
                    <ResponsiveContainer height={200}>
                      {chartDataLikes && composeChart(chartDataLikes)}
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-box-content">
              <div className="left-panel-inner">
                <div className="booth-selection">
                  <div className="heading-panel">REACTIONS</div>
                </div>
                <div className="voter-graph">
                  <div className="voter-data">
                    <ResponsiveContainer height={200}>
                      {chartDataReactions && composeChart(chartDataReactions)}
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="graph-box-content">
              <div className="left-panel-inner">
                <div className="booth-selection">
                  <div className="heading-panel">COMMENTS</div>
                </div>
                <div className="voter-graph">
                  <div className="voter-data">
                    <ResponsiveContainer height={200}>
                      {chartDataComments && composeChart(chartDataComments)}
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SocialMediaReport;



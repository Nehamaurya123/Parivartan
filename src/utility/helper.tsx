

import {Area, Bar, ReferenceLine, Line, Tooltip, XAxis, YAxis, CartesianGrid, ComposedChart, Legend} from 'recharts';
import  moment from 'moment';
export const titleCase = (str: string): string => {
  if(typeof str === 'undefined') return "";
  return str.replace(/\b\S/g, f => f.toUpperCase());
}

export const reload = (fromServer = false) => {
  // location.reload();
}

const _default_fetch_params = {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET',
  mode: 'cors',
  redirect: 'follow'
};

export const formatDateMysql = (mysqldate: string) => {
	const m = moment(mysqldate);
	return m.format('MMMM Do, YYYY h:mm A')
}

export function composeChart(widget: any){

	var getChart = (chart: any, isMultiple?: boolean) => {
		var fillOpacity = (isMultiple)?0.5:1;

		switch (chart.type) {
			case "area" :
				return <Area type="monotone" fill={chart.color} fillOpacity={fillOpacity} strokeWidth="2" dataKey={chart.key} stroke={chart.color} />;
				break;
			case "line":
				return <Line type="monotone" dot={chart.dot} fill={chart.color} strokeWidth="2" dataKey={chart.key} stroke={chart.color} />;
				break;
			case "bar":
				return <Bar dataKey={chart.key} fill={chart.color} />;
				break;
		}
	};

	var getMargin = (widget: any) => {
		var margin = {top: 5, right:0, left:0, bottom: 0};
		if(widget.type == 'single' && widget.chart != 'undefined' && widget.chart.type == 'area'){
			margin.right = -30;
			margin.left = -30;
		}
		return margin;
	}

	return (
		<ComposedChart data={widget.data} margin={getMargin(widget)} >
    
			{(widget.type == 'single') ? getChart(widget.chart) : widget.charts.map((chart: string) => {
				return getChart(chart, true);
      })}
     {(widget.tooltip)?<Tooltip/>:''}
			{(widget.line) ? <ReferenceLine y={widget.line.value} label={widget.line.label} strokeDasharray="5 5" stroke={widget.line.color} /> :''}
			{(widget.axis && widget.axis.x) ? <XAxis tickSize={widget.axis.x.tickSize} dataKey={widget.axis.x.key} axisLine={false} tickLine={false} padding={{left:60 }} dy={-40} /> : ''}
      {(widget.axis && widget.axis.y) ? <YAxis tickSize={(widget.axis.y.tickSize)?widget.axis.y.tickSize:10} mirror={true} axisLine={false} tickLine={false} allowDecimals={false}  padding={{top:50, bottom:50}}/> : ''}
      {(widget.legend) ? <Legend /> : ''}
		</ComposedChart>
	)
}



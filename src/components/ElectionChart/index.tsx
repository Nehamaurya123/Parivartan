import React from 'react';
import { COLOURS } from '../../utility/constants';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomPieChart(props: any) {
  let i = 0;

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  props.data.map((data: any) => {
    if (i < 25) {
      data.fill = COLOURS[i];
      i++;
    } else {
      data.fill = getRandomColor();
    }
  });

  const style = {
    lineHeight: '24px',
  };

  return (
    <ResponsiveContainer height={350}>
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={props.data}
          cx={210}
          cy={150}
          innerRadius={0}
          outerRadius={120}
          fill='#82ca9d'
          dataKey={props.dataKey}
          nameKey={props.nameKey}
        />
        <Legend
          iconSize={19}
          width={140}
          height={200}
          layout='vertical'
          verticalAlign='middle'
          wrapperStyle={style}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;

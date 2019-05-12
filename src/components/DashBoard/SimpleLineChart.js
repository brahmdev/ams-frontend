import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { name: 'Jan', Expense: 2200, Income: 3400 },
  { name: 'Feb', Expense: 1280, Income: 2398 },
  { name: 'Mar', Expense: 5000, Income: 4300 },
  { name: 'Apr', Expense: 4780, Income: 2908 },
  { name: 'May', Expense: 5890, Income: 4800 },
  { name: 'Jun', Expense: 4390, Income: 3800 },
  { name: 'Jul', Expense: 4490, Income: 4300 },
  { name: 'Aug', Expense: 4490, Income: 4300 },
  { name: 'Sep', Expense: 4490, Income: 4300 },
  { name: 'Aug', Expense: 6000, Income: 4300 },
  { name: 'Oct', Expense: 4000, Income: 8000 },
  { name: 'Nov', Expense: 4490, Income: 4300 },
  { name: 'Dev', Expense: 4490, Income: 4300 },
];

function SimpleLineChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;

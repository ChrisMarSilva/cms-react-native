import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
}  from 'recharts';


export default class BarChart2 extends PureComponent {

  render() {
    return (
      <div style={{ width: '100%', height: 350 ,backgroundColor: "#ffff"}}>
      <h4 className="text-center">This Year's sales and supply cost comparison</h4>
      <ResponsiveContainer>
      <AreaChart
        width={1100}
        height={350}
        data={this.props.outputTradeFinal}
        margin={{
          top: 10, right: 30, left: 20, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="cost" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
      </ResponsiveContainer>
      </div>
    );
  }
}

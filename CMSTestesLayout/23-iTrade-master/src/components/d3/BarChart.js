import React from "react"
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";


const BarChart=({outputMsales,month})=>{
    
  const data = outputMsales
        return(
          <div style={{ width: '100%', height: 350 ,backgroundColor: "#ffff"}}>
            <h4 className="text-center">{month} sales report per day</h4>
          <ResponsiveContainer>
             <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
      </div>
      
        )
    }


export default BarChart
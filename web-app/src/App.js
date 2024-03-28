import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

import "./index.css";

function percentToInt(percentString) {
  let numberString = percentString.replace(/%/g, '');
  
  let intValue = parseInt(numberString, 10);
  
  return intValue;
}

function App() {
  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/role')
      .then(function (response) {
        setRoleData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log()

  const data = [
    { name: "TOP", value: percentToInt(roleData["TOP"]) },
    { name: "JUNGLE", value: percentToInt(roleData["JUNGLE"]) },
    { name: "MID", value: percentToInt(roleData["MID"]) },
    { name: "ADC", value: percentToInt(roleData["ADC"]) },
    { name: "SUPPORT", value: percentToInt(roleData["SUPPORT"]) }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF2042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="container">
      <nav className="navbar">
        <button className="navbar-btn">Filter 1</button>
        <button className="navbar-btn">Filter 2</button>
        <button className="navbar-btn">Filter 3</button>
      </nav>
      <section className="chart-container">
        <h1 className="title">Camembert</h1>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={180}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </section>
    </div>
  );
}

export default App;

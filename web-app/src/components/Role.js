import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

function percentToInt(percentString) {
  let numberString = percentString.replace(/%/g, '');
  
  let intValue = parseInt(numberString, 10);
  
  return intValue;
}

function Role() {
  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/role')
      .then(function (response) {
        setRoleData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (roleData === null) {
    return <div>Loading...</div>;
  }


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
    <section className="chart-container">
        <h1 className="title">Role pickrate</h1>
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
  );
}

export default Role;

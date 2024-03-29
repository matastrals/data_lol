import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

function percentToInt(percentString) {
    let numberString = percentString.replace(/%/g, '');
    
    let intValue = parseInt(numberString, 10);
    
    return intValue;
}

function Class() {
    const [classdata, setclassdata] = useState(null);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:5000/class')
        .then(function (response) {
          setclassdata(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  
    if (classdata === null) {
      return <div>Loading...</div>;
    }
  
    const data = [
      { name: "Fighter", value: percentToInt(classdata["Fighter"]) },
      { name: "Mage", value: percentToInt(classdata["Mage"]) },
      { name: "Marksman", value: percentToInt(classdata["Marksman"]) },
      { name: "Tank", value: percentToInt(classdata["Tank"]) },
      { name: "Assassin", value: percentToInt(classdata["Assassin"]) },
      { name: "Support", value: percentToInt(classdata["Support"]) }
    ];
  
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF2042", "#808000"];
  
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
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
  
    return (
      <section className="chart-container">
          <h1 className="title">Class pickrate</h1>
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

export default Class;
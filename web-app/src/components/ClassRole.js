import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

function percentToInt(percentString) {
    let numberString = percentString.replace(/%/g, '');   
    let intValue = parseInt(numberString, 10);    
    return intValue;
}

function ClassRole() {
    const [classRoleData, setClassRoleData] = useState(null);
    const [currentClass, setCurrentClass] = useState("Assassin");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/class/role')
            .then(function (response) {
                setClassRoleData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    if (classRoleData === null) {
        return <div>Loading...</div>;
    }

    const renderChart = () => {
        const roleData = classRoleData[currentClass];

        const data = roleData.map(([role, percentage]) => ({
            name: role,
            value: percentage,
        }));

        const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF2042"];

        return (
            <div className="chart-container">
                <h1 className="title">{currentClass} pickrate by role</h1>
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
            </div>
        );
    };

    const handleClassChange = (className) => {
        setCurrentClass(className);
    };

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
        <div>
            <div className="button-container">
                {Object.keys(classRoleData).map((className) => (
                    <button
                        key={className}
                        onClick={() => handleClassChange(className)}
                        className={className === currentClass ? "active" : ""}
                    >
                        {className}
                    </button>
                ))}
            </div>
            {renderChart()}
        </div>
    );
}

export default ClassRole;

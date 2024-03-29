import React, { useEffect, useState } from "react";
import axios from "axios";

function RoleTier() {
  const [roleTierData, setRoleTierData] = useState(null);
  const [filter, setFilter] = useState('TOP');

  const handleFilterChange = (value) => {
    setFilter(value);
    axios.get(`http://127.0.0.1:5000/role/tier/${filter}`)
        .then(function (response) {
            setRoleTierData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/role/tier/${filter}`)
        .then(function (response) {
            setRoleTierData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

  if (roleTierData === null) {
    return <div>Loading...</div>;
  }

  return (
    <section className="chart-container">
        <h1 className="title">Role Tier</h1>
        <div className="button-container">
            <button className={'TOP' === filter ? "active" : ""} onClick={() => handleFilterChange('TOP')}>TOP</button>
            <button className={'JUNGLE' === filter ? "active" : ""} onClick={() => handleFilterChange('JUNGLE')}>JUNGLE</button>
            <button className={'MID' === filter ? "active" : ""} onClick={() => handleFilterChange('MID')}>MID</button>
            <button className={'SUPPORT' === filter ? "active" : ""} onClick={() => handleFilterChange('SUPPORT')}>SUPPORT</button>
            <button className={'ADC' === filter ? "active" : ""} onClick={() => handleFilterChange('ADC')}>ADC</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tier</th>
                </tr>
            </thead>
            <tbody>
                {roleTierData.map((data) => (
                    <tr>
                        <td>{data.Name}</td>
                        <td>{data.Tier}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
  );
}

export default RoleTier;
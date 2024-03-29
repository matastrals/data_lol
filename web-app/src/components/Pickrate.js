import React, { useEffect, useState } from "react";
import axios from "axios";

function Pickrate() {
  const [pickData, setPickData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/pickrate')
      .then(function (response) {
        setPickData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (pickData === null) {
    return <div>Loading...</div>;
  }

  return (
    <section className="chart-container">
        <h1 className="title">Champ pickrate</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Pick %</th>
                </tr>
            </thead>
            <tbody>
                {pickData.map((data) => (
                    <tr>
                        <td>{data.Name}</td>
                        <td>{data['Moyenne Pick %']}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
  );
}

export default Pickrate;
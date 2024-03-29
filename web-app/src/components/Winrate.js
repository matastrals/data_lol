import React, { useEffect, useState } from "react";
import axios from "axios";

function Winrate() {
  const [winData, setWinData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/winrate')
      .then(function (response) {
        setWinData(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (winData === null) {
    return <div>Loading...</div>;
  }

  return (
    <section className="chart-container">
        <h1 className="title">Champ pickrate</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Win %</th>
                </tr>
            </thead>
            <tbody>
                {winData.map((data) => (
                    <tr>
                        <td>{data.Name}</td>
                        <td>{data['Win %']}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
  );
}

export default Winrate;
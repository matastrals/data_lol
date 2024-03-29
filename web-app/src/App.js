import React, { useState } from "react";
import Role from "./components/Role";
import "./index.css";

function App() {
  const [filter, setFilter] = useState('role');

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const RenderComponent = () => {
    switch (filter) {
      case 'role':
        return <Role />;
      case 'win':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <button className="navbar-btn" onClick={() => handleFilterChange('role')}>Role pickrate</button>
        <button className="navbar-btn" onClick={() => handleFilterChange('win')}>Winrate</button>
      </nav>
      <RenderComponent/>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Role from "./components/Role";
import Class from "./components/Class";
import ClassRole from "./components/ClassRole";
import Pickrate from "./components/Pickrate";
import Winrate from "./components/Winrate";
import RoleTier from "./components/RoleTier";

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
      case 'class':
        return <Class />;
      case 'classrole':
        return <ClassRole />;
      case 'pickrate':
        return <Pickrate />;
      case 'winrate':
        return <Winrate />;
      case 'roleTier':
        return <RoleTier />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <button className="navbar-btn" onClick={() => handleFilterChange('role')}>Role pickrate</button>
        <button className="navbar-btn" onClick={() => handleFilterChange('class')}>Class pickrate</button>
        <button className="navbar-btn" onClick={() => handleFilterChange('classrole')}>Class by role pickrate</button>
        <button className="navbar-btn" onClick={() => handleFilterChange('pickrate')}>Champ pickrate</button>
        <button className="navbar-btn" onClick={() => handleFilterChange('winrate')}>Champ winrate</button>
        <button className="navbar-btn" onClick={() => handleFilterChange('roleTier')}>Role tier</button>
      </nav>
      <RenderComponent/>
    </div>
  );
}

export default App;

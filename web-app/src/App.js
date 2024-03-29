import React, { useState } from "react";
import Role from "./components/Role";
import "./index.css";
import Class from "./components/Class";
import ClassRole from "./components/ClassRole";

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
      </nav>
      <RenderComponent/>
    </div>
  );
}

export default App;

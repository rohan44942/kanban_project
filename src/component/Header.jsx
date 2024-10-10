import React, { useState } from "react";
import "./Header.css";

function Header({ setGroupBy, setSortBy, groupBy, sortBy }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <div className="display-wrapper">
        <button className="display-button" onClick={toggleDropdown}>
          <img
            src={"./icons_FEtask/display.svg"}
            alt="Display Icon"
            className="icon"
          />
          Display
          <img
            src={"./icons_FEtask/down.svg"} // Add the path to your dropdown icon
            alt="Dropdown Icon"
            className="dropdown-icon"
          />
        </button>

        {showDropdown && (
          <div className="dropdown">
            <div className="select-wrapper">
              <span>Grouping</span>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="select"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="select-wrapper">
              <span>Ordering</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

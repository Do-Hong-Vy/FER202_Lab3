import React from 'react';

const FilterBar = ({ searchTerm, onSearchChange, filterMajor, onFilterChange }) => {
  return (
    <div className="filters-container animate-fade-in">
      <input
        type="text"
        className="search-box"
        placeholder="Search students by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="filter-select"
        value={filterMajor}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="All Majors">All Majors</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Business Administration">Business Administration</option>
        <option value="Marketing">Marketing</option>
        <option value="Software Engineering">Software Engineering</option>
      </select>
    </div>
  );
};

export default FilterBar;

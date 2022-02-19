import React from 'react';

const Filter = ({ filterValue, onChange }) => {
  return (
    <div>
      <label htmlFor="filter">Filter displayed numbers</label>
      <input id="filter" value={filterValue} onChange={onChange} />
    </div>
  );
};

export default Filter;

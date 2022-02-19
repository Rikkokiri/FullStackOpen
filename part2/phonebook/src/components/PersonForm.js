import React from 'react';

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <label htmlFor="name">Name </label>
        <input
          id="name"
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="number">Number </label>
        <input
          id="number"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;

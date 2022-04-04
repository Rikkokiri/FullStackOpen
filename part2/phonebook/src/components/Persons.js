import React from 'react';

const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;

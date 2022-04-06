import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import * as contactsService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    contactsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow =
    filterInput === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterInput.toLowerCase()),
        );

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilterInput(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const name = newName.trim(); // Remove trailing whitespace
    console.log('name to submit:', name);

    // If the phone book already includes the name that user tries to add, prevent adding it.
    // (Case insensitive check)
    if (persons.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      if (
        window.confirm(
          `Name '${name}' is already in the phonebook. Replace the old number with new one?`,
        )
      ) {
        return updateNumber(name);
      }
    } else if (persons.some((p) => p.number === newNumber)) {
      window.alert(`The number ${newNumber} is already in the phonebook.`);
    } else if (name === '' || newNumber === '') {
      window.alert('Both fields need to be filled.');
    } else {
      const personObject = {
        name: name,
        number: newNumber,
      };

      contactsService
        .create(personObject)
        .then((returnedPerson) => {
          console.log(returnedPerson);
          setNewNumber('');
          setNewName('');
          setStatusMessage({
            msg: `Added ${returnedPerson.name}`,
            error: false,
          });
          setTimeout(() => {
            setStatusMessage(null);
          }, 2500);
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => {
          setStatusMessage({ msg: error.response.data.error, error: true });
        });
    }
  };

  const updateNumber = (name) => {
    const person = persons.find(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
    const changedPerson = { ...person, number: newNumber };

    contactsService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : returnedPerson)),
        );
        setNewNumber('');
        setNewName('');
        setStatusMessage({
          msg: `Updated ${returnedPerson.name}'s number`,
          error: false,
        });
        setTimeout(() => {
          setStatusMessage(null);
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
        setStatusMessage({ msg: error.response.data.error, error: true });
        setTimeout(() => {
          setStatusMessage(null);
        }, 2500);
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      contactsService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.log(error);
          setStatusMessage({ msg: error.response.data.error, error: true });
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={statusMessage} />
      <Filter filterValue={filterInput} onChange={handleFilterChange} />
      <h2>Add New Contact</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

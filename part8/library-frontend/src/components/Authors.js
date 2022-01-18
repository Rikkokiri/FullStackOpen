import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries';

const AuthorDetailsForm = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const [updateBirthyear] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    console.log('Updating birth year');

    const setBornTo = Number(year);
    updateBirthyear({ variables: { name, setBornTo } });

    setName('');
    setYear('');
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

const Authors = ({ show, authors }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorDetailsForm />
    </div>
  );
};

export default Authors;

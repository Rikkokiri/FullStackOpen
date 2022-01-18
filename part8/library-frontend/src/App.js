import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const result = useQuery(page === 'authors' ? ALL_AUTHORS : ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add Book</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} books={result.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;

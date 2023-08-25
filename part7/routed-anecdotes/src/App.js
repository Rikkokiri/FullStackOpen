import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import AnecdoteList from './components/AnecdoteList';
import AnecdotePage from './components/AnecdotePage';
import Footer from './components/Footer';
import Menu from './components/Menu';
import NewAnecdoteForm from './components/NewAnecdoteForm';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new anecdote "${anecdote.content}" created!`);
    setTimeout(() => setNotification(''), 10000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <p>{notification}</p>
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/create">
          <NewAnecdoteForm addNew={addNew} />
        </Route>
        <Route path="/anecdotes/:id">
          <AnecdotePage anecdote={anecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;

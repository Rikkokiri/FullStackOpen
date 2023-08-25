const AnecdotePage = ({ anecdote }) =>
  anecdote ? (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  ) : (
    <div>
      <p>404: Anecdote not found</p>
    </div>
  );

export default AnecdotePage;

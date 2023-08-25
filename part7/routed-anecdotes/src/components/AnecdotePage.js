/**
 * 7.2 - Implement a view for showing a single anecdote.
 * Navigating to the page showing the single anecdote is done by
 * clicking the name of that anecdote.
 */
const AnecdotePage = ({ anecdote }) => {
  if (anecdote) {
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
      </div>
    )
  }

  return (
    <div>
      <p>404: Anecdote not found</p>
    </div>
  )
}

export default AnecdotePage

import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotesQuery = useQuery('anecdotes', getAnecdotes)

  if (anecdotesQuery.isLoading) {
    return <div>Loading...</div>
  }

  /**
   * 6.20 - Implement retrieving anecdotes from the server using React Query.
   * The application should work in such a way that if there are problems
   * communicating with the server, only an error page will be displayed:
   */
  if (anecdotesQuery.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotesQuery.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
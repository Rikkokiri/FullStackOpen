import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {
  useNotificationDispatch,
  showNotification,
} from './NotificationContext'
import { useAnecdotesApiData, useAnecdoteApiPut } from './anecdotes'

const App = () => {
  const dispatchNotification = useNotificationDispatch()
  const updateAnecdoteMutation = useAnecdoteApiPut()
  const anecdotesQuery = useAnecdotesApiData()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    showNotification(
      dispatchNotification,
      `You voted for: '${anecdote.content}'`,
      5
    )
  }

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
      <h1>Anecdote app</h1>

      <Notification />
      <AnecdoteForm />

      <ul className="anecdote-list">
        {anecdotesQuery.data.map((anecdote) => (
          <li key={anecdote.id}>
            <div className="anecdote-content">{anecdote.content}</div>
            <div>
              <span className="vote-count">
                has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
              </span>
              <button
                onClick={() => handleVote(anecdote)}
                style={{ marginLeft: 5 }}
              >
                Vote
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

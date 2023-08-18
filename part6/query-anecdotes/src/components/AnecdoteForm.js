import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import {
  showNotification,
  useNotificationDispatch,
} from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  /**
   * 6.21 - Implement adding new anecdotes to the server using React Query.
   * The application should render a new anecdote by default.
   * Note that the content of the anecdote must be at least 5 characters
   * long, otherwise the server will reject the POST request.
   * You don't have to worry about error handling now.
   */
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    showNotification(
      dispatchNotification,
      `You added new anecdote: '${content}'`,
      10
    )
  }

  return (
    <section className="anecdote-form">
      <h2>Create new</h2>
      <form onSubmit={onCreate}>
        <div>
          <input name="anecdote" />
        </div>
        <button>Create</button>
      </form>
    </section>
  )
}

export default AnecdoteForm

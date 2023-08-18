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
    onError: (error) => {
      console.log('error', error)
      if (error.request.status === 400) {
        showNotification(
          dispatchNotification,
          `Too short anecdote, must have length 5 or more`,
          10,
          true
        )
      } else {
        showNotification(
          dispatchNotification,
          `Error adding new anecdote: ${error.message}`,
          10,
          true
        )
      }
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await newAnecdoteMutation.mutateAsync({ content: content, votes: 0 })
    event.target.anecdote.value = ''
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

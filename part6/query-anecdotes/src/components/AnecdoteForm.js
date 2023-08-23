import {
  showNotification,
  useNotificationDispatch,
} from '../NotificationContext'
import { useAnecdoteApiPost } from '../anecdotes'

const AnecdoteForm = () => {
  const onCreateError = (error) => {
    /**
     * 6.24 - As stated in exercise 6.21, the server requires that the content
     * of the anecdote to be added is at least 5 characters long.
     * Now implement error handling for the insertion. In practice, it is
     * sufficient to display a notification to the user in case of a failed POST request.
     * The error condition should be handled in the callback function registered for it.
     */
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
        `Error adding new anecdote.`,
        10,
        true
      )
    }
  }

  const dispatchNotification = useNotificationDispatch()
  const newAnecdoteMutation = useAnecdoteApiPost(onCreateError)

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

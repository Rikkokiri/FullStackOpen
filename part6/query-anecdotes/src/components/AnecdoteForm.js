import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote, getAnecdotes } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  /**
   * 6.21 - Implement adding new anecdotes to the server using React Query.
   * The application should render a new anecdote by default.
   * Note that the content of the anecdote must be at least 5 characters
   * long, otherwise the server will reject the POST request.
   * You don't have to worry about error handling now.
   */
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSucess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      // const anecdotes = queryClient.getQueryData('anecdotes')
      // queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

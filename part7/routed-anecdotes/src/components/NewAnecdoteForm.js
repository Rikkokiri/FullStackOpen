import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

/**
 * 7.3 - The default functionality of the creation form is quite confusing
 * because nothing seems to be happening after creating a new anecdote using the form.
 *
 * Improve the functionality such that after creating a new anecdote the application
 * transitions automatically to showing the view for all anecdotes and the user
 * is shown a notification informing them of this successful creation for
 * the next five seconds.
 */
const NewAnecdoteForm = (props) => {
  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetAuthor()
    resetContent()
    resetInfo()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default NewAnecdoteForm

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const submitComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(createComment(blogId, comment))
    setComment('')
  }

  return (
    <form onSubmit={submitComment}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        id="comment"
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm

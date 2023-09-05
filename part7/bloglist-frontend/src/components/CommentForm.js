import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { Button, Textarea } from '@nextui-org/react'

/**
 * 7.19 - Extend your application so that users can add comments
 * to blog posts from the frontend:
 */
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
      <Textarea
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        id="comment"
      />
      <Button type="submit">Add comment</Button>
    </form>
  )
}

export default CommentForm

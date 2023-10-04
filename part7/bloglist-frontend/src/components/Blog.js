import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { redirect, useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import { Avatar, Button, Link } from '@nextui-org/react'
import { BsFillHandThumbsUpFill, BsFillTrash3Fill } from 'react-icons/bs'

/**
 * 7.16 - Implement a separate view for blog posts.
 * Users should be able to access the view by clicking the name of the blog post
 * in the view that lists all of the blog posts.
 *
 * After you're done with this exercise, the functionality that was implemented
 * in exercise 5.7 is no longer necessary. Clicking a blog post no longer needs
 * to expand the item in the list and display the details of the blog post.
 */
const Blog = () => {
  const blogId = useParams().blogId
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId))
  const user = useSelector((state) => state.login.currentUser)
  const allowDelete = blog?.user.username === user.username
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      redirect('/')
    }
  }

  if (blog === undefined) {
    return (
      <div>
        <h2>Blog not found</h2>
      </div>
    )
  }

  return (
    <div>
      <div className="my-4">
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <h3>by {blog.author}</h3>
        <div className="pt-2">
          <div>
            <Link href={blog.url} isExternal showAnchorIcon>
              {blog.url}
            </Link>
          </div>

          <div className="my-2">
            Submitted by user{' '}
            <span className="font-bold">{blog.user.username}</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <span>Likes {blog.likes}</span>
              <Button
                className="ml-4"
                onClick={() => handleLike(blog)}
                size="sm"
                variant="ghost"
                startContent={<BsFillHandThumbsUpFill />}
              >
                Like
              </Button>
            </div>
            {allowDelete && (
              <Button
                size="md"
                variant="ghost"
                onClick={() => removeBlog(blog)}
                startContent={<BsFillTrash3Fill />}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold">Comments</h3>
        <CommentForm blogId={blog.id} />

        {blog.comments.length ? (
          <ul className="flex flex-col gap-4 my-8">
            {blog.comments.map((comment) => (
              <li key={comment.id} className="flex gap-4">
                <Avatar
                  showFallback
                  // color="primary"
                  size="sm"
                  className="flex-none"
                />
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div>No comments yet</div>
        )}
      </div>
    </div>
  )
}

export default Blog

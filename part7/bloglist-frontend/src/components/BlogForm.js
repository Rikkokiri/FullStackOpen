import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    try {
      await createNewBlog(blogObject)
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 max-w-md">
        <h2>Create new</h2>
        <div>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="title"
            id="title"
            variant="bordered"
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <Input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="author"
            id="author"
            variant="bordered"
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <Input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="url"
            id="url"
            variant="bordered"
          />
        </div>
        <Button
          id="submit-create"
          type="submit"
          color="primary"
          className="w-fit"
        >
          Create
        </Button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}

export default BlogForm

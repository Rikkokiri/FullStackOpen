const BlogForm = ({
  createBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <form onSubmit={createBlog}>
      <h2>Create new</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          name="title"
          id="title"
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          name="author"
          id="author"
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          name="url"
          id="url"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;

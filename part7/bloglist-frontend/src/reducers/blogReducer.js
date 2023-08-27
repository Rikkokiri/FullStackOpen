import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as blogService from '../services/blogs'

/**
 * 7.11 - Store the information about blog posts in the Redux store.
 * In this exercise, it is enough that you can see the blogs in the backend and create a new blog.
 * You are free to manage the state for logging in and creating new blog posts by using the internal
 * state of React components.
 *
 * 7.12 - Expand your solution so that it is again possible to like and delete a blog.
 */

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
    updateBlog(state, action) {
      const blog = action.payload
      const id = blog.id
      return state.map((b) => (b.id !== id ? b : blog))
    },
  },
})

const selectBlogs = (state) => state.blogs

export const selectSortedBlogs = createSelector(selectBlogs, (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes)
})

export const { addBlog, removeBlog, setBlogs, updateBlog } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

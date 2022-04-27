import * as blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW': {
      return [...state, action.data];
    }
    case 'INIT_DATA': {
      return action.data;
    }
    case 'LIKE': {
      const id = action.data.id;
      return state.map((b) => (b.id !== id ? b : action.data));
    }
    case 'DELETE': {
      const id = action.data.id;
      return state.filter((b) => b.id !== id);
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_DATA',
      data: blogs,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.create(blog);
    dispatch({
      type: 'ADD_NEW',
      data,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    dispatch({
      type: 'LIKE',
      data,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: 'DELETE',
      data: { id },
    });
  };
};

export default blogReducer;

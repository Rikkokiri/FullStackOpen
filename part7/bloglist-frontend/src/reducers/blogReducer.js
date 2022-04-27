import * as blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW': {
      return [...state, action.data];
    }
    case 'INIT_DATA': {
      return action.data;
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
    console.log('Does this get called?');
    const data = await blogService.create(blog);
    dispatch({
      type: 'ADD_NEW',
      data,
    });
  };
};

/* export const likeBlog = () => {

} */

/* export const deleteBlog = () => {

} */

export default blogReducer;

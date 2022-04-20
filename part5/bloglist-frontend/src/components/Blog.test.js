import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'tester',
      name: 'Test User',
    },
  };

  const user = {
    username: 'tester',
    name: 'Test User',
  };

  const mockHandleLike = jest.fn();
  const mockRemoveBlog = jest.fn();

  const setupBlog = () =>
    render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        removeBlog={mockRemoveBlog}
        user={user}
      />
    );

  test('renders only basic details (title and author) by default', () => {
    setupBlog();
    const title = screen.getByText(blog.title, { exact: false });
    const author = screen.getByText(blog.author, { exact: false });
    expect(title).toBeDefined();
    expect(author).toBeDefined();

    const likeButton = screen.queryByText('Like');
    const url = screen.queryByText(blog.url);
    expect(likeButton).toBeNull();
    expect(url).toBeNull();
  });

  /**
   * 5.14 - Make a test which checks that the blog's url and number of likes are shown
   * when the button controlling the shown details has been clicked.
   */
  test('all details are revealed by clicking a button', async () => {
    setupBlog();
    const showButton = await screen.findByText('View');
    await userEvent.click(showButton);

    const likes = screen.getByText(`Likes ${blog.likes}`);
    expect(likes).toBeDefined();
    const url = screen.getByText(blog.url);
    expect(url).toBeDefined();
    const likeButton = screen.getByText('Like');
    expect(likeButton).toBeDefined();
  });

  /**
   * 5.15 - Make a test which ensures that if the like button is clicked twice,
   * the event handler the component received as props is called twice.
   */
  test('like button calls event handler each time', async () => {
    setupBlog();
    const showButton = await screen.findByText('View');
    await userEvent.click(showButton);

    const likeButton = screen.getByText('Like');
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });
});

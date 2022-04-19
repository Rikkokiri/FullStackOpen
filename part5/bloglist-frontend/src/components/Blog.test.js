import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
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

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        handleLike={mockHandleLike}
        removeBlog={mockRemoveBlog}
        user={user}
      />
    );
    // screen.debug();
  });

  test('renders only basic details (title and author) by default', () => {
    const title = screen.getByText(blog.title, { exact: false });
    const author = screen.getByText(blog.author, { exact: false });
    expect(title).toBeDefined();
    expect(author).toBeDefined();

    const likeButton = screen.queryByText('like');
    const url = screen.queryByText(blog.url, { exact: false });
    expect(likeButton).toBeNull();
    expect(url).toBeNull();
  });
});

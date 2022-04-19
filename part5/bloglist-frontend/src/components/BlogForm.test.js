import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  /**
   * 5.16 - Make a test for the new blog form. The test should check, that
   * the form calls the event handler it received as props with the right details
   * when a new blog is created.
   */
  test('event handler is called on form submit', async () => {
    const mockCreateBlog = jest.fn();

    const { container } = render(<BlogForm createBlog={mockCreateBlog} />);

    // TODO: input fields (title, author, url)
    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');

    const createButton = screen.getByText('Create');

    await userEvent.type(titleInput, 'Title of the blog');
    await userEvent.type(authorInput, 'Example Author');
    await userEvent.type(urlInput, 'www.exampleblog.com/new-post');
    await userEvent.click(createButton);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('Title of the blog');
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('Example Author');
    expect(mockCreateBlog.mock.calls[0][0].url).toBe(
      'www.exampleblog.com/new-post'
    );
  });
});

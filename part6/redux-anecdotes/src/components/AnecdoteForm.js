import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

/**
 * 6.7 - Separate the creation of new anecdotes into a component called AnecdoteForm.
 * Move all logic for creating a new anecdote into this new component.
 *
 * 6.15 - Modify the creation of new anecdotes, so that the anecdotes are stored
 * in the backend.
 */
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <section className="anecdote-form">
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <textarea name="anecdote" />
        </div>
        <button>Create</button>
      </form>
    </section>
  )
}

export default AnecdoteForm

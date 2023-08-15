import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

/**
 * 6.8 - Separate the rendering of the anecdote list into a component
 * called AnecdoteList. Move all logic related to voting for an anecdote to
 * this new component.
 */
const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    // 6.5 - Make sure that the anecdotes are ordered by the number of votes.
    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)
    if (filter === '') {
      return sorted
    }

    // 6.9 - Implement filtering for the anecdotes that are displayed to the user.
    return sorted.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(setNotification(`You voted for: '${anecdote.content}'`, 5))
  }

  return (
    <ul className="anecdote-list">
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id} style={{ marginBottom: 5 }}>
          <div className="anecdote-content">{anecdote.content}</div>
          <div>
            <span className="vote-count">
              has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
            </span>
            <button onClick={() => vote(anecdote.id)} style={{ marginLeft: 5 }}>
              Vote
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AnecdoteList

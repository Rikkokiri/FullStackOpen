import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(setNotification(`You voted for: '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList

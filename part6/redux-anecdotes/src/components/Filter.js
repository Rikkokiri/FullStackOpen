import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

/**
 * 6.9 - Create a new Filter component for displaying the filter.
 */
const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div className="filter-anecdotes">
      <label htmlFor="filter-input">Filter anecdotes</label>
      <input id="filter-input" onChange={handleChange} />
    </div>
  )
}

export default Filter

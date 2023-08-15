import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

/**
 * 6.9 - Create a new Filter component for displaying the filter.
 */
const Filter = (props) => {
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }

  return (
    <div className="filter-anecdotes">
      <label htmlFor="filter-input">Filter anecdotes</label>{' '}
      <input id="filter-input" onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter

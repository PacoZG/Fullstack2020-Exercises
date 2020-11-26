import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect} from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }
  const style = {
    margin: 10
    }
  return (
    <div style={style}>
      {'filter'}<input
        name="filter"
        onChange={handleChange} />
    </div>
  )
}

const ConnectedAnecdotes = connect ( null, { filterChange } )(Filter)

export default ConnectedAnecdotes
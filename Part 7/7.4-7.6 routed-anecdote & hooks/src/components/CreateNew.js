import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>{'create a new anecdote'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {'content '}
          <input id="input"
          name={content.type}
          value={content.value}
          onChange={content.onChange}
          placeholder="content" />
        </div>
        <div>
          {'author '}
          <input id="input"
          name={author.type}
          value={author.value}
          onChange={author.onChange}
          placeholder="author" />
        </div>
        <div>
          {'url for more info '}
          <input id="input" 
          name={info.type}
          value={info.value}
          onChange={info.onChange}
          placeholder="link" />
        </div>
        <button type="submit">{'create'}</button>
        <button onClick={handleReset}>{'reset'}</button>
      </form>
    </div>
  )
}

export default CreateNew
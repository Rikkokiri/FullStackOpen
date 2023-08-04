import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import './index.css'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK',
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <h1>Give Unicafe feedback</h1>
      <button className="feedback good" onClick={good}>
        good
      </button>
      <button className="feedback ok" onClick={ok}>
        ok
      </button>
      <button className="feedback bad" onClick={bad}>
        bad
      </button>
      <button className="reset" onClick={reset}>
        reset stats
      </button>
      <div className="statsContainer">
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

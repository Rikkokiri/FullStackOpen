import React from 'react'
import { createRoot } from 'react-dom/client'
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
        <div>
          <div>good</div>
          <div>{store.getState().good}</div>
        </div>
        <div>
          <div>ok</div>
          <div>{store.getState().ok}</div>
        </div>
        <div>
          <div>bad</div>
          <div>{store.getState().bad}</div>
        </div>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

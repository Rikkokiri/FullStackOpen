import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import store from './reducers/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NextUIProvider>
      <Router>
        <App />
      </Router>
    </NextUIProvider>
  </Provider>
)

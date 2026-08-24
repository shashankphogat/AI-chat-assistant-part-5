import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from "./app.store.js"
import AuthInitializer from './AuthInitializer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
      <App />
      </AuthInitializer>
    </Provider>
  </StrictMode>,
)

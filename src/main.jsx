import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as StateProviderRedux } from 'react-redux'
import './styles/reset.css'
import './styles/styles.css'
import App from './components/App'
import { store } from './state/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateProviderRedux store={store}>
      <App />
    </StateProviderRedux>
  </StrictMode>,
)


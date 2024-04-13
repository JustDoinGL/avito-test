import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/index.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './common/ErrorFallback/ErrorFallback'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
)

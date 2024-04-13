import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import store from './redux/store'
import App from './App'
import { ReactNode } from 'react'
import 'intersection-observer'

export const renderWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  )
}

describe('App Routing', () => {
  test('renders MainPage as the default route', () => {
    renderWithRouter(<App />)
    expect(screen.getByTestId('main-page')).toBeInTheDocument()
  })

  test('renders FilmPage for a /film/:id path', () => {
    renderWithRouter(<App />, { route: '/film/123' })
    expect(screen.getByTestId('film-page')).toBeInTheDocument()
  })

  test('renders AuthPage for the /auth path', () => {
    renderWithRouter(<App />, { route: '/auth' })
    expect(screen.getByTestId('auth-page')).toBeInTheDocument()
  })

  test('renders SignUpPage for the /login path', () => {
    renderWithRouter(<App />, { route: '/login' })
    expect(screen.getByTestId('signup-page')).toBeInTheDocument()
  })

  test('renders NotFoundPage for a non-matching route', () => {
    renderWithRouter(<App />, { route: '/something-that-does-not-match' })
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
  })
})

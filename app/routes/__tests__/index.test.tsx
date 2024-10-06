import { createRemixStub } from '@remix-run/testing'
import { render, screen } from '~/utils/testing'
import Index from '../_index'

describe('index page', () => {
	test('should render index page', () => {
		const App = createRemixStub([{ path: '/', Component: Index }])

		render(<App />)

		screen.getByText(/welcome to/i)
	})
})

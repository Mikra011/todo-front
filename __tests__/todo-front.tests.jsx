import React from 'react'
import 'cross-fetch/polyfill'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Separator from '../src/components/Separator'
import TodoForm from '../src/components/TodoForm'
import DndTodo from '../src/components/DndTodo'
import { Provider } from 'react-redux'
import { store } from '../src/state/store'
import SpinnerWithCountdown from '../src/components/SpinnerWithCountDown'

describe('Separator Component', () => {
    test('renders with default styles', () => {
        const { container } = render(<Separator />)

        // Get the <hr> element and check its styles
        const hr = container.querySelector('hr')
        expect(hr).toHaveStyle('borderTop: 1px solid #ccc') // Default values
    })

    test('applies custom color and thickness', () => {
        const { container } = render(<Separator color="red" thickness="2px" />)

        // Get the <hr> element and check its styles for custom color and thickness
        const hr = container.querySelector('hr')
        expect(hr).toHaveStyle('borderTop: 2px solid red')
    })
})

describe('TodoForm component', () => {
    test('renders TodoForm with initial empty input', () => {
        render(
            <Provider store={store}>
                <TodoForm />
            </Provider>
        )
        const input = screen.getByLabelText(/New Task:/i)
        expect(input).toHaveValue('') // Ensures the input starts empty
    })

    test('updates input value when typing', () => {
        render(
            <Provider store={store}>
                <TodoForm />
            </Provider>
        )
        const input = screen.getByLabelText(/New Task:/i)

        // Simulate user typing
        fireEvent.change(input, { target: { value: 'New Task' } })
        expect(input).toHaveValue('New Task')
    })

    test('submit button is disabled when input is empty', () => {
        render(
            <Provider store={store}>
                <TodoForm />
            </Provider>
        )
        const submitButton = screen.getByRole('button', { name: /🚀/i })
        expect(submitButton).toBeDisabled()
    })

    test('submit button is enabled when input has value', () => {
        render(
            <Provider store={store}>
                <TodoForm />
            </Provider>
        )
        const input = screen.getByLabelText(/New Task:/i)
        const submitButton = screen.getByRole('button', { name: /🚀/i })

        // Simulate typing in the input
        fireEvent.change(input, { target: { value: 'New Task' } })
        expect(submitButton).toBeEnabled()
    })

})

describe('DndTodo Component', () => {
    const mockTodo = {
        id: '1',
        label: 'Test Todo',
        complete: false
    }

    const mockToggle = jest.fn()
    const mockDelete = jest.fn()

    beforeEach(() => {
        render(
            <DndTodo todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
        )
    })

    test('should render the todo label', () => {
        expect(screen.getByText(/Test Todo/i)).toBeInTheDocument()
    })

    test('should render the checkbox with the correct checked state', () => {
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()
    })

    test('should call onToggle when the checkbox is clicked', () => {
        const checkbox = screen.getByRole('checkbox')
        fireEvent.click(checkbox)
        expect(mockToggle).toHaveBeenCalledTimes(1)
    })

    test('should call onToggle when the todo label is clicked', () => {
        const label = screen.getByText(/Test Todo/i)
        fireEvent.click(label)
        expect(mockToggle).toHaveBeenCalledTimes(1)
    })

    test('should call onDelete when the delete icon is clicked', () => {
        const deleteIcon = screen.getByTestId('delete-icon')
        fireEvent.click(deleteIcon)
        expect(mockDelete).toHaveBeenCalledTimes(1)
    })
})

jest.useFakeTimers()

describe('SpinnerWithCountdown', () => {

    test('should render spinner and message initially', () => {
        render(<SpinnerWithCountdown />)

        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument()

        const message = screen.getByText(/It is a free deployment, so please be patient.../)
        expect(message).toBeInTheDocument()

        const countdown = screen.getByText(/60s/)
        expect(countdown).toBeInTheDocument()
    })

    test('should count down from 60 to 59 after 1 second', () => {
        render(<SpinnerWithCountdown />)

        expect(screen.getByText(/60s/)).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        expect(screen.getByText(/59s/)).toBeInTheDocument()
    })
})

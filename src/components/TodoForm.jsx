import React, { useReducer } from 'react'
import { useCreateTodoMutation } from '../state/todosApi'

const CHANGE_LABEL = 'CHANGE_LABEL'

const initialState = {
    todoLabel: '',
}
const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_LABEL:
            return { ...state, todoLabel: action.payload }
        default:
            return state
    }
}

export default function TodoForm() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [createTodo, { error: createTodoError }] = useCreateTodoMutation()

    const onLabelChange = ({ target: { value } }) => {
        dispatch({ type: CHANGE_LABEL, payload: value })
    }

    const resetForm = () => {
        dispatch({ type: CHANGE_LABEL, payload: '' })
    }

    const onNewTodo = async evt => {
        evt.preventDefault()
        const { todoLabel: label, todoIsCompleted: complete } = state
        createTodo({ label, complete })
            .unwrap()
            .then(() => {
                resetForm()
            })
            .catch(() => alert("Something went wrong"))
    }

    return (
        <form id="todoForm" onSubmit={onNewTodo}>
            <div className="error">{createTodoError && createTodoError.data.message}</div>
            <div>
                <h3>Tasks</h3>
                <label className='formInput'>
                    <span>New Task:</span>
                    <input
                        type='text'
                        name='todoLabel'
                        onChange={onLabelChange}
                        value={state.todoLabel}
                        style={{ border: 'none' }}
                    />
                </label>
            </div>

            <label className='submitBtn'>
                <input
                    type='submit'
                    value='🚀'
                    disabled={!state.todoLabel.trim()}
                />
            </label>
        </form>
    )
}

import React from 'react'
import Todos from './Todos'
import TodoForm from './TodoForm'
import Separator from './Separator'

export default function App() {
  return (
    <div id="mp">
      <TodoForm />
      <Separator color='#EBEBEB' />
      <Todos />
    </div>
  )
}

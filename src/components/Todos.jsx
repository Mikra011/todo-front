import React, { useState, useEffect } from 'react';
import { useGetTodosQuery, useToggleTodoMutation, useDeleteTodoMutation } from '../state/todosApi';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import DndTodo from './DndTodo';

export default function Todos() {
  const { data: todos = [], isLoading, isFetching } = useGetTodosQuery()
  const [toggleTodo, { isLoading: todoIsToggling }] = useToggleTodoMutation()
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation()
  const [sortedTodos, setSortedTodos] = useState(todos)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (todos.length > 0) {
      setSortedTodos(todos)
    }
  }, [todos])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    setSortedTodos((prev) =>
      arrayMove(prev, prev.findIndex((todo) => todo.id === active.id), prev.findIndex((todo) => todo.id === over.id))
    )
  }

  return (
    <div id="todos">
      {/* 
      Otionally spinners could be displayed here or anywhere else
      <h3> 
        {todoIsToggling || isFetching ? 'Refreshing...' : ''}
        {isDeleting ? 'Deleting tasks...' : ''}
      </h3> 
      */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ul>
          {isLoading ? (
            'Tasks are loading...'
          ) : (
            <SortableContext items={sortedTodos} strategy={verticalListSortingStrategy}>
              {sortedTodos.map((todo) => {
                const onToggle = () =>
                  toggleTodo({ id: todo.id, todo: { complete: !todo.complete } })
                const onDelete = () => {
                  deleteTodo({ id: todo.id }).then(() => {
                    setSortedTodos((prev) => prev.filter((t) => t.id !== todo.id))
                  })
                }
                return (
                  <DndTodo
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                )
              })}
            </SortableContext>
          )}
        </ul>
      </DndContext>
    </div>
  )
}

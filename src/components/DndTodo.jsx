import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PiTrashSimple } from 'react-icons/pi';
import StyledTodo from './StyledTodo';

export default function DndTodo({ todo, onToggle, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: todo.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <StyledTodo ref={setNodeRef} style={style} $complete={todo.complete}>
            <div>
                <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={onToggle}
                    className="custom-checkbox"
                />
                <span onClick={onToggle} {...attributes} {...listeners}>
                    {todo.label}
                </span>
            </div>
            <PiTrashSimple
                onClick={onDelete}
                style={{
                    cursor: 'pointer',
                    fontSize: '22px',
                    color: '#9E78CF',
                }}
            />
        </StyledTodo>
    )
}

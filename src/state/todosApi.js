import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:9000/api/'

export const todosApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Tasks'],
    endpoints: build => ({
        getTodos: build.query({
            query: () => 'tasks',
            providesTags: ['Tasks']
        }),
        toggleTodo: build.mutation({
            query: ({ id, todo }) => ({
                url: `tasks/${id}`,
                method: 'Put',
                body: todo
            }),
            invalidatesTags: ['Tasks'],
        }),
        createTodo: build.mutation({
            query: todo => ({
                url: 'tasks',
                method: 'Post',
                body: todo
            }),
            invalidatesTags: ['Tasks']
        }),
        deleteTodo: build.mutation({
            query: ({ id}) => ({
                url: `tasks/${id}`,
                method: 'Delete'
            }),
            invalidatesTags: ['Tasks']
        })
    })
})

export const {
    useGetTodosQuery,
    useToggleTodoMutation,
    useCreateTodoMutation,
    useDeleteTodoMutation
} = todosApi
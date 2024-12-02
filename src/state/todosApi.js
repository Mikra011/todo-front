import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/api/' }),
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
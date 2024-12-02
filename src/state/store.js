import { configureStore } from '@reduxjs/toolkit'
import { todosApi } from './todosApi'

export const store = configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer, 
    },
    middleware: getDefault => getDefault().concat(
        todosApi.middleware 
    )
})

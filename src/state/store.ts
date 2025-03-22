import { configureStore } from '@reduxjs/toolkit'
import { jerseySlice } from './jerseys'
import { globalOptionsSlice } from './globalOptions.ts'
// ...

export const store = configureStore({
    reducer: {
        jerseys: jerseySlice.reducer,
        options: globalOptionsSlice.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
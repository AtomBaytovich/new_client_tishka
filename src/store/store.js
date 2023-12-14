import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authorization/auth.slice'
import userSlice from './user/user.slice'
import noteSlice from './notes/note.slice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        note: noteSlice
    },
})

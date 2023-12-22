import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authorization/auth.slice'
import userSlice from './user/user.slice'
import noteSlice from './notes/note.slice'
import notesSlice from './notes/notes.slice'
import mopiksSlice from './mopiks/mopiks.slice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        note: noteSlice,
        noteS0: notesSlice,
        mopikS0: mopiksSlice
    },
})

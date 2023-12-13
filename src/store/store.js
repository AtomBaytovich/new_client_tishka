import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authorization/auth.slice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
})

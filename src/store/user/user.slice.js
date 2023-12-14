import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMe } from '../../api/services/user';

// Создаем асинхронный Thunk для выполнения запроса на сервер
export const getUserMe = createAsyncThunk(
    'user/login',
    async () => await getMe()
);

// Создаем slice с Redux Toolkit
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        error: undefined,
        user: {}
    },
    reducers: {
        clearUser: (state) => {
            state.isLoading = false;
            state.error = undefined;
            state.user = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserMe.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getUserMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.user = action.payload.user;
            })
            .addCase(getUserMe.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;

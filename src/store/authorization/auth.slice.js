import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkAuth, login as loginF, logout, registration } from '../../api/services/auth';

// Создаем асинхронный Thunk для выполнения запроса на сервер
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ login, password, captcha }) => await loginF({ login, password, captcha })
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ login, password, captcha }) => await registration({ login, password, captcha })
);

export const refreshTokens = createAsyncThunk(
    'auth/refreshTokens',
    async () => {
        const response = await checkAuth()
        return response.data;
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => await logout()
);

// Создаем slice с Redux Toolkit
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        isLoadingAuth: false,
        error: undefined,
    },
    reducers: {
        clearError: (state, action) => {
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoadingAuth = true;
                state.error = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoadingAuth = false;
                state.error = undefined;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoadingAuth = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoadingAuth = true;
                state.error = undefined;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoadingAuth = false;
                state.error = undefined;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoadingAuth = false;
                state.error = action.error.message;
            })
            .addCase(refreshTokens.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(refreshTokens.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.isAuthenticated = true;
            })
            .addCase(refreshTokens.rejected, (state) => {
                state.isLoading = false;
                state.error = undefined;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
                state.error = undefined;
                state.isAuthenticated = false;
            });
    },
});

// Экспортируем actions и reducer из slice
export const { clearError } = authSlice.actions;
export default authSlice.reducer;

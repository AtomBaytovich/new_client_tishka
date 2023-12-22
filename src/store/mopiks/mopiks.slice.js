import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMopikS as get } from '../../api/services/mopiks';

// Создаем асинхронный Thunk для выполнения запроса на сервер

export const getMopikS = createAsyncThunk(
    'mopikS0/getMopikS',
    async ({ start = 0, count = 40 }) => await get({ start, count })
);

// Создаем slice с Redux Toolkit
const mopikS0Slice = createSlice({
    name: 'mopikS0',
    initialState: {
        isLoading: false,
        error: undefined,
        data: {
            mopiks: [],
            remainingItems: undefined,
            totalItems: undefined,
        },
    },
    reducers: {
        clear: (state) => {
            state.data.mopiks = [];
            state.data.remainingItems = undefined;
            state.data.totalItems = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMopikS.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getMopikS.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.data.mopiks = [
                    ...state.data.mopiks,
                    ...action.payload.mopiks
                ]
                state.data.totalItems = action.payload.totalItems;
                state.data.remainingItems = action.payload.remainingItems;
            })
            .addCase(getMopikS.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const { clear } = mopikS0Slice.actions;
export default mopikS0Slice.reducer;

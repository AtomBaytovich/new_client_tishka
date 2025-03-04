import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNoteS as get  } from '../../api/services/notes';

// Создаем асинхронный Thunk для выполнения запроса на сервер

export const getNoteS = createAsyncThunk(
    'noteS0/getNoteS',
    async ({ start = 0, count = 40 }) => await get({ start, count })
);


// Создаем slice с Redux Toolkit
const noteS0Slice = createSlice({
    name: 'noteS0',
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
        },
        addNew: (state, action) => {
            state.data.mopiks.unshift(action.payload);
        },
        put: (state, action) => {
            let mopik = state.data.mopiks.find((element) => element._id == action.payload.id);

            // Изменяем найденный элемент
            if (mopik) {
                mopik.text = action.payload.text;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNoteS.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getNoteS.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                // state.data.mopiks.push(...action.payload.mopiks);
                state.data.mopiks = [
                    ...state.data.mopiks,
                    ...action.payload.mopiks
                ]
                // state.data.mopiks = Array.from(new Set([...state.data.mopiks, ...action.payload.mopiks]));
                state.data.totalItems = action.payload.totalItems;
                state.data.remainingItems = action.payload.remainingItems;
            })
            .addCase(getNoteS.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const { clear, addNew, put } = noteS0Slice.actions;
export default noteS0Slice.reducer;

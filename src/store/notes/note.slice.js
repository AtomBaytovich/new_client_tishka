import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createMopik, getMopik, putMopik } from '../../api/services/notes.js';
// Создаем асинхронный Thunk для выполнения запроса на сервер
export const createNote = createAsyncThunk(
    'note/createNote',
    async () => await createMopik()
);

export const getNote = createAsyncThunk(
    'note/getNote',
    async ({ id }) => await getMopik({ id })
);

export const putNote = createAsyncThunk(
    'note/putNote',
    async ({ id, text }) => await putMopik({ id, text })
);


// Создаем slice с Redux Toolkit
const noteSlice = createSlice({
    name: 'note',
    initialState: {
        isLoading: false,
        put: {
            loading: false,
            date: undefined
        },
        error: undefined,
        mopik: undefined
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.mopik = action.payload.mopik;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getNote.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.mopik = action.payload.mopik;
                console.log(action.payload.mopik)
            })
            .addCase(getNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(putNote.pending, (state) => {
                state.put.loading = true;
                state.error = undefined;
            })
            .addCase(putNote.fulfilled, (state, action) => {
                state.put.loading = false;
                state.error = undefined;
                state.mopik = action.payload.mopik;
            })
            .addCase(putNote.rejected, (state, action) => {
                state.put.loading = false;
                state.error = action.error.message;
            })
    },
});

export default noteSlice.reducer;

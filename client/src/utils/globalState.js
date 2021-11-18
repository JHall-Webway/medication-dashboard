import { configureStore, createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'global',
    initialState: {
        user: null,
        search: ''
    },
    reducers: {
        searchMeds: (state, { payload }) => {
            state.search = payload;
        },
        clearSearch: (state) => {
            state.search = '';
        },
        updateUser: (state, { payload }) => {
            state.user = payload;
        },
        reload: (state) => {
            state = { ...state };
        }
    }
});

export const { searchMeds, clearSearch, updateUser, reload } = slice.actions;

export default configureStore({
    reducer: {
        global: slice.reducer
    }
})
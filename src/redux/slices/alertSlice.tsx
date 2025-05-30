import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertState = {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | '';
};

const initialState: AlertState = {
    message: '',
    type: '',
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<{ message: string; type: AlertState['type'] }>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearAlert: (state) => {
            state.message = '';
            state.type = '';
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;

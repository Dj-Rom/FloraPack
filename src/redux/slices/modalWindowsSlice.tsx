import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalWindows = {
    isModalFormForAddNewName: boolean;
};

const initialState: ModalWindows = {
    isModalFormForAddNewName: false,
};

export const modalWindowsSlice = createSlice({
    name: 'modalWindows',
    initialState,
    reducers: {
        setIsModalWindows: (state, action: PayloadAction<keyof ModalWindows>) => {
            state[action.payload] = !state[action.payload];
        },
    },
});

export const { setIsModalWindows } = modalWindowsSlice.actions;
export default modalWindowsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

type FormState = {
    buttonShowItems: boolean;

};

const initialState: FormState = {
    buttonShowItems: false,
}
export const formSlice = createSlice({
    name: 'formList',
    initialState,
    reducers: {
        setShowButton: (state) => {
            state.buttonShowItems = !state.buttonShowItems;
        },
    }
});

export const { setShowButton } = formSlice.actions;
export default formSlice.reducer;

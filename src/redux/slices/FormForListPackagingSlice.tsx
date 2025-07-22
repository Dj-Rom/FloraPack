import { createSlice } from '@reduxjs/toolkit';

type FormState = {
    buttonShowItems: boolean;

};
const stored = localStorage.getItem('FloraPackSettingsPackagingList1');
let parsed;

try {
    parsed = stored ? JSON.parse(stored) : {};
} catch (e) {
    console.error('Error parsing JSON:', e);
    parsed = {};
}
let allTrueKeys = [];

if (parsed && typeof parsed.packList === 'object' && parsed.packList !== null) {
    allTrueKeys = Object.entries(parsed.packList)
        .filter(([, value]) => value === false)
        .map(([key]) => key);
} else {
    console.warn('packList is missing or invalid:', parsed);
}

const initialState: FormState = {
    buttonShowItems: allTrueKeys.length === 0 ? true : false,
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

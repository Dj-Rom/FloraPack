import { createSlice } from '@reduxjs/toolkit';

type SettingPackSliceState = {
    isSelectLanguage: boolean;
    isSelectPackList: boolean;
    isSelectWhatsAppMessage: boolean
};

const savedState = localStorage.getItem('FloraPackSettings');
const initialState: SettingPackSliceState = savedState
    ? JSON.parse(savedState)
    : {
        isSelectLanguage: false,
        isSelectPackList: false,
        isSelectWhatsAppMessage: false
    };

export const naviSlice = createSlice({
    name: 'navi',
    initialState,
    reducers: {
        setIsSelectLanguage: (state) => {
            state.isSelectLanguage = !state.isSelectLanguage;

        },
        setIsSelectPackList: (state) => {
            state.isSelectPackList = !state.isSelectPackList;
        },
        setIsSelectWhatsAppMessage: (state) => {
            state.isSelectWhatsAppMessage = !state.isSelectWhatsAppMessage;
        },
    },
});

export const { setIsSelectLanguage, setIsSelectPackList, setIsSelectWhatsAppMessage } = naviSlice.actions;
export default naviSlice.reducer;

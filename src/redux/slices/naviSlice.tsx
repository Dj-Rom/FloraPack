import { createSlice } from '@reduxjs/toolkit';

type SettingPackSliceState = {
    isSelectLanguage: boolean;
    isSelectPackList: boolean;
    isSelectWhatsAppMessage: boolean;
    isSelectActivityHistoty: boolean;
};

const LOCAL_STORAGE_KEY = 'FloraPackSettings';

const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState: SettingPackSliceState = savedState
    ? JSON.parse(savedState)
    : {
        isSelectLanguage: false,
        isSelectPackList: false,
        isSelectWhatsAppMessage: false,
        isSelectActivityHistoty: false,
    };

const saveState = (state: SettingPackSliceState) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const naviSlice = createSlice({
    name: 'navi',
    initialState,
    reducers: {
        setIsSelectLanguage: (state) => {
            state.isSelectLanguage = !state.isSelectLanguage;
            saveState(state);
        },
        setIsSelectPackList: (state) => {
            state.isSelectPackList = !state.isSelectPackList;
            saveState(state);
        },
        setIsSelectWhatsAppMessage: (state) => {
            state.isSelectWhatsAppMessage = !state.isSelectWhatsAppMessage;
            saveState(state);
        },
        setIsSelectActivityHistoty: (state) => {
            state.isSelectActivityHistoty = !state.isSelectActivityHistoty;
            saveState(state);
        },
    },
});

export const {
    setIsSelectLanguage,
    setIsSelectPackList,
    setIsSelectWhatsAppMessage,
    setIsSelectActivityHistoty,
} = naviSlice.actions;

export default naviSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

type SettingPackSliceState = {
    isSelectLanguage: boolean;
    isSelectPackList: boolean;
};

const savedState = localStorage.getItem('FloraPackSettings');
const initialState: SettingPackSliceState = savedState
    ? JSON.parse(savedState)
    : {
        isSelectLanguage: false,
        isSelectPackList: false,
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
    },
});

export const { setIsSelectLanguage, setIsSelectPackList } = naviSlice.actions;
export default naviSlice.reducer;

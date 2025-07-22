import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialPackList } from '../../data/initialPackList';
import { InitialPackList } from '../../components/FormForListPackaging';

const LOCAL_STORAGE_KEY = 'dataPackLists1';

const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState: InitialPackList = savedState
    ? JSON.parse(savedState)
    : initialPackList;

const saveToLocalStorage = (state: InitialPackList) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...state }));
};

export const dataPackListSlice = createSlice({
    name: 'dataPackList',
    initialState,
    reducers: {
        setPackItem: (
            state,
            action: PayloadAction<{ name: string; value: string | number }>
        ) => {
            state[action.payload.name] = Number(action.payload.value);
            saveToLocalStorage(state);
        },
        clearAllPackItems: (state) => {
            for (const key in state) {
                state[key] = 0;
            }
            saveToLocalStorage(state);
        },
        addNewPackName: (state, action: PayloadAction<string>) => {
            state[action.payload] = 0;
            saveToLocalStorage(state);
        },
    },
});

export const { setPackItem, addNewPackName, clearAllPackItems } = dataPackListSlice.actions;
export default dataPackListSlice.reducer;

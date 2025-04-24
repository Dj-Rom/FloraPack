import { createSlice } from '@reduxjs/toolkit';
import { initialPackList } from '../../data/initialPackList';
import { InitialPackList } from '../../components/FormForListPackaging';


const savedState = localStorage.getItem('dataPackLists');
const initialState: InitialPackList = savedState
    ? JSON.parse(savedState)
    : initialPackList;

export const dataPackListSlice = createSlice({
    name: 'datePackList',
    initialState,
    reducers: {
        setPackItem: (state, action) => {
            state[action.payload.name] = Number(action.payload.value);
            localStorage.setItem('dataPackLists', JSON.stringify({ ...state }));
        },
        clearAllPackItems: (state) => {
            for (const key in state) {
                state[key] = 0
            }
            localStorage.setItem('dataPackLists', JSON.stringify({ ...state }));
        },
        addNewPackName: (state, action) => {
            console.log(action.payload);
            state[action.payload] = 0
            localStorage.setItem('dataPackLists', JSON.stringify({ ...state }));
        }

    },
});

export const { setPackItem, addNewPackName, clearAllPackItems } = dataPackListSlice.actions;
export default dataPackListSlice.reducer;

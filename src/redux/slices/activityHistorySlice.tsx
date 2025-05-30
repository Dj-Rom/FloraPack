import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataLog = {
    message: {
        name: string;
        prevalue: string | number;
        value: string | number;
        sign: string;
    };
    datetime: number;
};

type ActivityHistoryState = {
    limit: number;
    history: DataLog[];
};

const LOCAL_STORAGE_KEY = 'FlorapackActiveHistory';

const loadInitialState = (): ActivityHistoryState => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved) as ActivityHistoryState;
        } catch (e) {
            console.error('Failed to parse activity history from localStorage:', e);
        }
    }
    return {
        limit: 100,
        history: [],
    };
};

const initialState: ActivityHistoryState = loadInitialState();

const activityHistorySlice = createSlice({
    name: 'activityHistory',
    initialState,
    reducers: {
        addLog: (state, action: PayloadAction<DataLog>) => {
            state.history.unshift(action.payload);
            if (state.history.length > state.limit) {
                state.history.pop();
            }
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        clearHistory: (state) => {
            state.history = [];
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
            state.history = state.history.slice(0, action.payload);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        },
    },
});

export const { addLog, clearHistory, setLimit } = activityHistorySlice.actions;
export default activityHistorySlice.reducer;
